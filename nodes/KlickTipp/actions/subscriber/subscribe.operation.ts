import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {
	handleError,
	handleResponse,
	transformDataFields,
	updateDisplayOptions,
} from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'Enter email address (required)',
	},
	{
		displayName: 'SMS Number',
		name: 'smsNumber',
		type: 'string',
		default: '',
		placeholder: 'Enter SMS number (optional)',
	},
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Opt-in Process',
		name: 'listId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOptInProcesses',
		},
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		default: '',
	},
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTags',
		},
		default: '',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
	{
		displayName: 'Data Fields',
		name: 'fields',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		description: 'Select the data field (optional)',
		options: [
			{
				name: 'dataFields',
				displayName: 'Data Field',
				values: [
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
						displayName: 'Field Name',
						name: 'fieldId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getFields',
						},
						default: '',
						description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
					},
					{
						displayName: 'Field Value',
						name: 'fieldValue',
						type: 'string',
						default: '',
						description: 'Enter the value for the selected field',
					},
				],
			},
		],
	},
];

const displayOptions = {
	show: {
		resource: ['subscriber'],
		operation: ['subscribe'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const email = this.getNodeParameter('email', index) as string;
	const listId = this.getNodeParameter('listId', index) as number;
	const tagId = this.getNodeParameter('tagId', index) as number;
	const smsNumber = this.getNodeParameter('smsNumber', index) as string;
	const fields = this.getNodeParameter('fields', index) as IDataObject;

	if (!email) {
		return handleError.call(this, 'The email address is required.');
	}

	// Construct request body
	const body: IDataObject = {
		email,
		...(listId && { listid: listId }),
		...(tagId && { tagid: tagId }),
		...(smsNumber && { smsnumber: smsNumber }),
		...(fields?.dataFields && { fields: transformDataFields(fields.dataFields as IDataObject[]) }),
	};

	try {
		const responseData = await apiRequest.call(this, 'POST', '/subscriber', body);
		return handleResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
