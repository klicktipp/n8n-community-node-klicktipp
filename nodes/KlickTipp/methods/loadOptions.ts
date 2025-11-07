import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { apiRequest } from '../transport';
import { IResponse } from '../helpers/interfaces';
import { isEmpty, isObject } from 'lodash';

/**
 * Adds a placeholder option to the beginning of options if provided.
 */
function addPlaceholder(
	options: INodePropertyOptions[],
	placeholder?: string,
): INodePropertyOptions[] {
	if (placeholder) {
		options.unshift({ name: placeholder, value: '' });
	}
	return options;
}

/**
 * Utility function to get data from the API and transform it to INodePropertyOptions format.
 */
async function getOptions(
	this: ILoadOptionsFunctions,
	endpoint: string,
	placeholder?: string,
	defaultName = 'Unnamed',
): Promise<INodePropertyOptions[]> {
	// Access the credentials
	const node = this.getNode();
	const credentialsId = node.credentials?.klickTippApi?.id;

	if (!credentialsId) {
    throw new NodeOperationError(node, 'Credentials ID is missing.');
	}

	// Fetch data from the API
	const responseData: IResponse = await apiRequest.call(this, 'GET', endpoint);

	// Handle unexpected response formats
	if (!isObject(responseData) || isEmpty(responseData)) {
		throw new NodeOperationError(node, `Unexpected response format for ${endpoint}`);
	}

	// Map the API response to INodePropertyOptions format
	const options = Object.entries(responseData).map(([id, name]) => ({
		name: name || defaultName,
		value: id,
	}));

	options.sort((a, b) => a.name.localeCompare(b.name));

	return addPlaceholder(options, placeholder);
}

export async function getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	return getOptions.call(this, '/tag', 'Please select a tag');
}

export async function getTagsWithoutPlaceholder(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	return getOptions.call(this, '/tag');
}

export async function getOptInProcesses(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	return getOptions.call(
		this,
		'/list',
		'Please select the opt-in process',
		'Predefined double opt-in process',
	);
}

export async function getFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	return getOptions.call(this, '/field', 'Please select a field');
}
