import {
	IDataObject,
	IDisplayOptions,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import NodeCache from 'node-cache';

import { merge, reduce, uniqBy } from 'lodash';
import { CACHE_TTL } from '../helpers/constants';

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
const cache = new NodeCache({ stdTTL: CACHE_TTL });

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
	const errorMessage =
		typeof error === 'string' ? error : (error as Error).message || 'Undefined error';

	return this.helpers.returnJsonArray({
		success: false,
		error: errorMessage,
	});
}

export function handleResponse(
	this: IExecuteFunctions,
	data: IDataObject,
	index: number,
): INodeExecutionData[] {
	return this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(data), {
		itemData: { item: index },
	});
}
