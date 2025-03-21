import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, handleObjectResponse, updateDisplayOptions } from '../../utils/utilities';

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
		displayName: 'Email Address',
		name: 'email',
		type: 'string',
		placeholder: 'Enter email address (required)',
		default: '',
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
		return handleError.call(this, 'Opt-in process ID is missing');
	}

	if (!email) {
		return handleError.call(this, 'Email is missing');
	}

	const body: IDataObject = {
		listid: listId,
		email,
	};

	try {
		const responseData = await apiRequest.call(this, 'POST', '/list/redirect', body);

		const enhancedData = {
			redirectUrl: responseData[0],
		};

		return handleObjectResponse.call(this, enhancedData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
