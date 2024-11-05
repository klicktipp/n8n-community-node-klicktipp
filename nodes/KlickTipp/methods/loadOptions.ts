import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { apiRequest } from '../transport';
import { IResponse } from "../helpers/interfaces";
import { cache } from '../utils/utilities';

/**
 * Utility function to get data from cache or API and transform it to INodePropertyOptions format.
 */
async function getCachedOptions(
	this: ILoadOptionsFunctions,
	cacheKey: string,
	endpoint: string,
	placeholder: string,
	defaultName?: string
): Promise<INodePropertyOptions[]> {
	// Check the cache for existing data
	let options = cache.get<INodePropertyOptions[]>(cacheKey);
	if (options) {
		console.log(`Served from cache: ${cacheKey}`);
		return options;
	}

	// Fetch data from the API
	const responseData = await apiRequest.call(this, 'GET', endpoint);
	if (typeof responseData !== 'object' || responseData === null) {
		throw new Error('Unexpected response format');
	}

	// Map the API response to INodePropertyOptions format
	options = Object.entries(responseData as IResponse).map(([id, name]) => ({
		name: name || defaultName || 'Unnamed',
		value: id,
	}));

	// Add the placeholder option at the beginning
	options.unshift({ name: placeholder, value: '' });

	// Cache the options
	cache.set(cacheKey, options);

	return options;
}

export async function getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	return getCachedOptions.call(
		this,
		'cachedTags',
		'/tag',
		'Please select a tag'
	);
}

export async function getOptInProcesses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	return getCachedOptions.call(
		this,
		'cachedOptInProcesses',
		'/list',
		'Please select the opt-in process',
		'Predefined double opt-in process'
	);
}

export async function getFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	return getCachedOptions.call(
		this,
		'cachedDataFields',
		'/field',
		'Please select a field'
	);
}