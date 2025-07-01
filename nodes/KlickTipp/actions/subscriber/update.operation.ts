import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, transformDataFields, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Identify Contact By',
		name: 'identifierType',
		type: 'options',
		options: [
			{
				name: 'Contact ID',
				value: 'id',
			},
			{
				name: 'Email Address',
				value: 'email',
			},
		],
		default: 'id',
	},
	{
		displayName: 'Contact ID',
		name: 'subscriberId',
		type: 'string',
		default: '',
		placeholder: 'Enter contact ID (required)',
		displayOptions: {
			show: {
				identifierType: ['id'],
			},
		},
	},
	{
		displayName: 'Email Address',
		name: 'lookupEmail',
		type: 'string',
		default: '',
		placeholder: 'Enter email address (required)',
		displayOptions: {
			show: {
				identifierType: ['email'],
			},
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
	const identifierType = this.getNodeParameter('identifierType', index) as string;
	let subscriberId: string;

	if (identifierType === 'email') {
		const lookupEmail = this.getNodeParameter('lookupEmail', index) as string;

		if (!lookupEmail) {
			return handleError.call(this, 'Email address is missing');
		}

		try {
			const response = await apiRequest.call(this, 'POST', '/subscriber/search', { email: lookupEmail });

			if (Array.isArray(response) && response.length > 0) {
				subscriberId = response[0];
			} else {
				return handleError.call(this, 'No contact found for the provided email');
			}
		} catch (error) {
			return handleError.call(this, error);
		}
	} else {
		// identifierType === 'id'
		subscriberId = this.getNodeParameter('subscriberId', index) as string;
	}

	if (!subscriberId) {
		return handleError.call(this, 'Contact ID is missing');
	}

	// Retrieve values for updates.
	const email = this.getNodeParameter('email', index) as string;
	const smsNumber = this.getNodeParameter('smsNumber', index) as string;
	const fields = this.getNodeParameter('fields', index) as IDataObject;

	let transformedFields: IDataObject | undefined;

	if (fields?.dataFields) {
		try {
			transformedFields = transformDataFields(fields.dataFields as IDataObject[]);
		} catch (error) {
			// forward the “Duplicate field …” message
			return handleError.call(this, error);
		}
	}

	// Construct request body
	const body: IDataObject = {
		...(email && { newemail: email }),
		...(smsNumber && { newsmsnumber: smsNumber }),
		...(transformedFields && { fields: transformedFields }),
	};

	try {
		await apiRequest.call(this, 'PUT', `/subscriber/${subscriberId}`, body);
		return this.helpers.returnJsonArray({ success: true });
	} catch (error) {
		return handleError.call(this, error);
	}
}
