import {
	IDataObject,
	IDisplayOptions,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import NodeCache from 'node-cache';

import { merge, reduce, uniqBy } from 'lodash';

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

// Initialize the cache instance
const cache = new NodeCache({ stdTTL: 600 });

export function clearCache(keys?: string[]) {
	if (keys) {
		keys.forEach((key) => cache.del(key));
		console.log(`Cleared cache keys: ${keys.join(', ')}`);
	} else {
		cache.flushAll();
		console.log('Cleared all cache entries');
	}
}

export { cache };

export function handleError(this: IExecuteFunctions, error: unknown): INodeExecutionData[] {
	return this.helpers.returnJsonArray({
		success: false,
		error: (error as Error).message || 'Undefined error',
	});
}

export function handleResponse(
	this: IExecuteFunctions,
	data: unknown,
	index: number,
): INodeExecutionData[] {
	const responseData = typeof data === 'object' && data !== null ? (data as IDataObject) : {};

	return this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(responseData), {
		itemData: { item: index },
	});
}
