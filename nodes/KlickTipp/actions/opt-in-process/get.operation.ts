import type { IExecuteFunctions, INodeProperties, NodeApiError } from 'n8n-workflow';
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
		return handleError.call(this, 'Opt-in process ID is missing');
	}

	try {
		const responseData = await apiRequest.call(this, 'GET', `/list/${listId}`);
		return handleObjectResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error as NodeApiError);
	}
}
