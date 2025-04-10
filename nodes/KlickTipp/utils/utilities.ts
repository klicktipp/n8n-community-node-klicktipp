import {
	IDataObject,
	IDisplayOptions,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';

import { merge, reduce, uniqBy } from 'lodash';

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

  if (
    error &&
    error instanceof Error &&
    typeof (error as any).cause?.error?.error === 'number'
  ) {
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

/**
 * Transforms keys in the response object that start with "field" based on the provided fieldMappings.
 * @param responseData - The original response object that contains field keys
 * @param fieldMappings - The mapping object with keys as field ids and values as user-friendly labels
 * @returns The transformed response object with user-friendly field labels instead of ids
 */
export function transformFieldNames(
	responseData: IDataObject,
	fieldMappings: { [key: string]: string },
): IDataObject {
	for (const key in responseData) {
		// If the key starts with "field" and a mapping exists, add a new key with the user-friendly label
		if (key.startsWith('field') && fieldMappings[key]) {
			responseData[fieldMappings[key]] = responseData[key];
			delete responseData[key];
		}
	}
	return responseData;
}
