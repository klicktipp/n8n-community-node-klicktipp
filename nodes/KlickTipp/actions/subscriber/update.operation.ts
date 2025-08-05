import type { IDataObject, IExecuteFunctions, INodeProperties, NodeApiError } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {
	handleError,
	transformDataFields,
	updateDisplayOptions,
	resolveSubscriberId,
} from '../../utils/utilities';

export const properties: INodeProperties[] = [
	/* ---------- v1  (ID only) ---------------------------------- */
	{
		displayName: 'Contact ID',
		name: 'subscriberId',
		type: 'string',
		default: '',
		placeholder: 'Enter contact ID (required)',
		description: 'ID of the contact to retrieve',
		displayOptions: { show: { '@version': [1] } },
	},

	/* ---------- v2  selector, default = ID --------------------- */
	{
		displayName: 'Identify Contact By',
		name: 'identifierType',
		type: 'options',
		options: [
			{ name: 'Contact ID', value: 'id' },
			{ name: 'Email Address', value: 'email' },
		],
		default: 'id',
		displayOptions: { show: { '@version': [2] } },
	},

	/* duplicate selector for v3 – default = Email --------------- */
	{
		displayName: 'Identify Contact By',
		name: 'identifierType',
		type: 'options',
		options: [
			{ name: 'Contact ID', value: 'id' },
			{ name: 'Email Address', value: 'email' },
		],
		default: 'email',
		displayOptions: { show: { '@version': [3] } },
	},

	/* ID field for v2 + v3 (shown only when “ID” is chosen) ------ */
	{
		displayName: 'Contact ID',
		name: 'subscriberId',
		type: 'string',
		default: '',
		description: 'Enter the ID of the contact you want to retrieve',
		placeholder: 'Enter contact ID (required)',
		displayOptions: {
			show: { '@version': [2, 3], identifierType: ['id'] },
		},
	},

	/* Email field for v2 + v3 ----------------------------------- */
	{
		displayName: 'Email Address',
		name: 'lookupEmail',
		type: 'string',
		default: '',
		placeholder: 'Enter email address (required)',
		displayOptions: {
			show: { '@version': [2, 3], identifierType: ['email'] },
		},
	},
	{
		displayName: 'New Email Address',
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
		operation: ['update'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	// Retrieve values for updates.
	const email = this.getNodeParameter('email', index) as string;
	const smsNumber = this.getNodeParameter('smsNumber', index) as string;
	const fields = this.getNodeParameter('fields', index) as IDataObject;

	// Construct request body
	const body: IDataObject = {
		...(email && { newemail: email }),
		...(smsNumber && { newsmsnumber: smsNumber }),
		...(fields?.dataFields && { fields: transformDataFields(fields.dataFields as IDataObject[]) }),
	};

	try {
		const subscriberId = await resolveSubscriberId.call(this, index);

		await apiRequest.call(this, 'PUT', `/subscriber/${subscriberId}`, body);
		return this.helpers.returnJsonArray({ success: true });
	} catch (error) {
		return handleError.call(this, error as NodeApiError);
	}
}
