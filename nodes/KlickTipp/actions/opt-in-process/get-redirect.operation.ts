import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
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
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		required: true,
		description: 'Email address',
	},
];

const displayOptions = {
	show: {
		resource: ['opt-in'],
		operation: ['getRedirect'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const listId = this.getNodeParameter('listId', index) as string;
	const email = this.getNodeParameter('email', index) as string;

	if (!listId) {
		return handleError.call(this, 'The opt-in process ID is required.');
	}

	if (!email) {
		return handleError.call(this, 'The email address is required.');
	}

	const body: IDataObject = {
		listid: listId,
		email,
	};

	try {
		const responseData = await apiRequest.call(this, 'POST', '/list/redirect', body);
		return handleResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
