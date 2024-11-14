import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, handleResponse, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Opt-in Process',
		name: 'listId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOptInProcesses',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'Enter email address (required)',
		default: '',
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
