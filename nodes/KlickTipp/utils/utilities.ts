import {
	IDataObject,
	IDisplayOptions,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

import { merge, reduce, uniqBy } from 'lodash';

import { apiRequest } from '../transport';
import adjustErrorMessage from '../helpers/adjustErrorMessage';
import extractKlickTippError from '../helpers/extractKlickTippCode';
import buildValidationMessage from '../helpers/buildValidationMessage';

export function updateDisplayOptions(
	displayOptions: IDisplayOptions,
	properties: INodeProperties[],
) {
	return properties.map((nodeProperty) => {
		return {
			...nodeProperty,
			displayOptions: merge({}, nodeProperty.displayOptions, displayOptions),
		};
	});
}

export function transformDataFields(dataFields: IDataObject[]): IDataObject {
	// Remove duplicates based on fieldId
	const uniqueFields = uniqBy(dataFields, 'fieldId');

	return reduce(
		uniqueFields,
		(acc, field) => {
			const fieldId = field.fieldId as string;
			if (fieldId) {
				acc[fieldId] = field.fieldValue;
			}
			return acc;
		},
		{} as IDataObject,
	);
}

export function handleError(this: IExecuteFunctions, error: NodeApiError | string): never {
	// A plain string was thrown
	if (typeof error === 'string') {
		throw new NodeOperationError(this.getNode(), error);
	}

	const contextData = (error as NodeApiError & { context?: { data?: unknown } }).context?.data;
	const klickTippMessages = [...error.messages];

	if (contextData && typeof contextData === 'object' && !Array.isArray(contextData)) {
		klickTippMessages.unshift(JSON.stringify(contextData));
	}

	const klickTippError = extractKlickTippError(klickTippMessages);

	if (klickTippError) {
		// 1) Prefer new validation message: field + name + reason
		const validationMessage = buildValidationMessage(
			klickTippError.field,
			klickTippError.name,
			klickTippError.fieldValue,
			klickTippError.reason,
		);

		if (validationMessage) {
			error.description = validationMessage;
		} else if (typeof klickTippError.error === 'number') {
			// 2) Legacy fallback
			error.description = adjustErrorMessage(
				klickTippError.error,
				klickTippError.code,
				this.getNode().parameters,
			);
		}
	}

	throw error;
}

export function handleObjectResponse(
	this: IExecuteFunctions,
	data: IDataObject,
	index: number,
): INodeExecutionData[] {
	return this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(data), {
		itemData: { item: index },
	});
}

export function handleArrayResponse(
	this: IExecuteFunctions,
	data: IDataObject[],
	index: number,
): INodeExecutionData[] {
	return this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(data), {
		itemData: { item: index },
	});
}

export function objectToIdValueArray(obj: IDataObject | string[]): IDataObject[] {
	if (Array.isArray(obj)) {
		// Handle array of strings: map to [{ id: string }]
		return obj.map((id) => ({ id }));
	}

	// Handle object: map to [{ id, value }]
	return Object.entries(obj).map(([id, value]) => ({ id, value }));
}

/**
 * Custom function to convert an object into an URL-encoded query string.
 * This recursively handles nested objects.
 */
export function toQueryString(obj: IDataObject, prefix?: string): string {
	const str: string[] = [];
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const k = prefix ? `${prefix}[${key}]` : key;
			const value = obj[key];
			if (value !== null && typeof value === 'object') {
				// Recursively stringify nested objects
				str.push(toQueryString(value as IDataObject, k));
			} else {
				str.push(encodeURIComponent(k) + '=' + encodeURIComponent(String(value)));
			}
		}
	}
	return str.join('&');
}

function getRawParameterValue(
	this: IExecuteFunctions,
	parameterName: 'subscriberId' | 'lookupEmail',
): unknown {
	return this.getNode().parameters?.[parameterName];
}

function containsVariableReference(value: unknown): boolean {
	return (
		typeof value === 'string' &&
		(value.trim().startsWith('=') || /\{\{[\s\S]*\}\}/.test(value))
	);
}

function validateSubscriberIdentifier(
	this: IExecuteFunctions,
	parameterName: 'subscriberId' | 'lookupEmail',
	value: string,
): string {
	const normalizedValue = value.trim();
	const rawValue = getRawParameterValue.call(this, parameterName);

	if (!normalizedValue) {
		if (parameterName === 'subscriberId') {
			return handleError.call(this, 'Contact Identifier (ID or Key) is missing');
		}

		return handleError.call(this, 'Email is missing');
	}

	if (containsVariableReference(rawValue)) {
		return normalizedValue;
	}

	if (parameterName === 'lookupEmail') {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailPattern.test(normalizedValue)) {
			return handleError.call(
				this,
				'Valid email address required. Example: jsmith@example.com',
			);
		}

		return normalizedValue;
	}

	if (/\s/.test(normalizedValue)) {
		return handleError.call(
			this,
			'Contact Identifier (ID or Key) must not contain whitespace',
		);
	}

	return normalizedValue;
}

export async function resolveSubscriberId(this: IExecuteFunctions, index: number): Promise<string> {
	const identifierType = this.getNodeParameter('identifierType', index, 'id') as string;

	/* ─── look-up by plain ID ──────────────────────────── */
	if (identifierType === 'id') {
		const id = validateSubscriberIdentifier.call(
			this,
			'subscriberId',
			this.getNodeParameter('subscriberId', index) as string,
		);
		return id;
	}

	/* ─── look-up by e-mail ─────────────────────────────── */
	const email = validateSubscriberIdentifier.call(
		this,
		'lookupEmail',
		this.getNodeParameter('lookupEmail', index) as string,
	);

	const response = await apiRequest.call(this, 'POST', '/subscriber/search', { email });

	if (Array.isArray(response) && response.length) return response[0] as string;

	return handleError.call(this, 'No contact found for the provided email');
}

export function buildUrl(baseUrl: string, path: string) {
	const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${normalizedBase}${normalizedPath}`;
}
