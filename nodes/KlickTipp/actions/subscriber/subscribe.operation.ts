import type { IDataObject, IExecuteFunctions, INodeProperties, NodeApiError } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {
	handleError,
	handleObjectResponse,
	transformDataFields,
	updateDisplayOptions,
} from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName:
			'If a contact with the same email address or SMS number already exists, it will be updated.',
		name: 'info',
		type: 'notice',
		default: '',
	},
	{
		displayName: 'Email Address',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'Enter email address',
	},
	{
		displayName: 'SMS Number',
		name: 'smsNumber',
		type: 'string',
		default: '',
		placeholder: 'Enter SMS number',
	},
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Opt-in Process',
		name: 'listId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOptInProcesses',
		},
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		default: '',
	},
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Tag',
		name: 'tagId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTags',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
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
						required: true,
						typeOptions: {
							loadOptionsMethod: 'getFields',
						},
						default: '',
						description:
							'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
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

	// Validate that at least one of email or smsNumber is provided
	if (!email && !smsNumber) {
		return handleError.call(this, 'Email or SMS number is missing');
	}

	// Construct request body
	const body: IDataObject = {
		...(email && { email: email.trim() }),
		...(smsNumber && { smsnumber: smsNumber.trim() }),
		...(listId && { listid: listId }),
		...(tagId && { tagid: tagId }),
		...(fields?.dataFields && { fields: transformDataFields(fields.dataFields as IDataObject[]) }),
	};

	try {
		const responseData = await apiRequest.call(this, 'POST', '/subscriber', body);
		return handleObjectResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error as NodeApiError);
	}
}
