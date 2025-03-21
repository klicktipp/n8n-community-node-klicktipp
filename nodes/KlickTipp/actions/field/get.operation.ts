import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, handleObjectResponse, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Data Field',
		name: 'apiFieldId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getFields',
		},
		default: '',
		options: [],
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
];

const displayOptions = {
	show: {
		resource: ['field'],
		operation: ['get'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const apiFieldId = this.getNodeParameter('apiFieldId', index) as string;

	if (!apiFieldId) {
		return handleError.call(this, 'Data field ID is required');
	}

	//Extract field ID, i.e. CompanyName
	const fieldId = apiFieldId.replace(/^field/, '');

	if (!fieldId) {
		return handleError.call(this, 'No data field ID found');
	}

	try {
		const responseData = await apiRequest.call(this, 'GET', `/field/${fieldId}`);
		return handleObjectResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
