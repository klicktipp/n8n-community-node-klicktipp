import {
	IDataObject,
	IDisplayOptions,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';

import { merge, reduce, uniqBy } from 'lodash';

import { apiRequest } from '../transport';
import adjustErrorMessage from '../helpers/adjustErrorMessage';

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

export function handleError(this: IExecuteFunctions, error: unknown): INodeExecutionData[] {
	let errorMessage: string;

	if (error && error instanceof Error && typeof (error as any).cause?.error?.error === 'number') {
		errorMessage = adjustErrorMessage((error as any).cause.error.error);
	} else if (typeof error === 'string') {
		errorMessage = error;
	} else {
		errorMessage = error instanceof Error ? error.message : 'Undefined error';
	}

	return this.helpers.returnJsonArray({
		success: false,
		error: errorMessage,
	});
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


export async function resolveSubscriberId(
	this: IExecuteFunctions,
	index: number,
): Promise<string> {

	const identifierType = this.getNodeParameter('identifierType', index, 'id') as string;

	/* ─── look-up by plain ID ──────────────────────────── */
	if (identifierType === 'id') {
		const id = this.getNodeParameter('subscriberId', index) as string;
		if (!id) throw new Error('Contact ID is missing');
		return id;
	}

	/* ─── look-up by e-mail ─────────────────────────────── */
	const email = this.getNodeParameter('lookupEmail', index) as string;
	if (!email) throw new Error('Email address is missing');

	const response = await apiRequest.call(this, 'POST', '/subscriber/search', { email });

	if (Array.isArray(response) && response.length) return response[0] as string;

	throw new Error('No contact found for the provided email');
}
