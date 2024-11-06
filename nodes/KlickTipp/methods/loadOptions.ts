import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { apiRequest } from '../transport';
import { IResponse } from '../helpers/interfaces';
import { cache } from '../utils/utilities';
import {isEmpty, isObject} from "lodash";

/**
 * Adds a placeholder option to the beginning of options if provided.
 */
function addPlaceholder(options: INodePropertyOptions[], placeholder?: string): INodePropertyOptions[] {
	if (placeholder) {
		options.unshift({ name: placeholder, value: '' });
	}
	return options;
}

/**
 * Utility function to get data from cache or API and transform it to INodePropertyOptions format.
 */
async function getCachedOptions(
	this: ILoadOptionsFunctions,
	cacheKey: string,
	endpoint: string,
	placeholder?: string,
	defaultName = 'Unnamed',
): Promise<INodePropertyOptions[]> {
	// Check the cache for existing data
	let options = cache.get<INodePropertyOptions[]>(cacheKey);
	if (options) {
		console.log(`Served from cache: ${cacheKey}`);
		return addPlaceholder(options, placeholder);
	}

	// Fetch data from the API
	const responseData: IResponse = await apiRequest.call(this, 'GET', endpoint);

	// Handle unexpected response formats
	if (!isObject(responseData) || isEmpty(responseData)) {
		throw new Error(`Unexpected response format for ${endpoint}`);
	}

	// Map the API response to INodePropertyOptions format
	options = Object.entries(responseData).map(([id, name]) => ({
		name: name || defaultName,
		value: id,
	}));

	// Cache the options and add placeholder if needed
	cache.set(cacheKey, options);
	return addPlaceholder(options, placeholder);
}

export async function getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	return getCachedOptions.call(this, 'cachedTags', '/tag', 'Please select a tag');
}

export async function getTagsWithoutPlaceholder(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	return getCachedOptions.call(this, 'cachedTags', '/tag');
}

export async function getOptInProcesses(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	return getCachedOptions.call(
		this,
		'cachedOptInProcesses',
		'/list',
		'Please select the opt-in process',
		'Predefined double opt-in process',
	);
}

export async function getFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	return getCachedOptions.call(this, 'cachedDataFields', '/field', 'Please select a field');
}
