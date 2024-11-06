import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, handleResponse, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Opt-in process',
		name: 'listId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOptInProcesses',
		},
		default: '',
		required: true,
		description: 'Select the the ID of a opt-in process to retrieve',
	},
];

const displayOptions = {
	show: {
		resource: ['opt-in'],
		operation: ['get'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const listId = this.getNodeParameter('listId', index) as string;

	if (!listId) {
		return handleError.call(this, 'The opt-in process ID is required.');
	}

	try {
		const responseData = await apiRequest.call(this, 'GET', `/list/${listId}`);
		return handleResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
