import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, transformDataFields, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Search for ID by email',
		name: 'searchForIdByEmail',
		type: 'boolean',
		default: false,
		description: 'Toggle this to search for a Contact ID using an Email Address',
	},
	{
		displayName: 'Lookup Email Address',
		name: 'lookupEmail',
		type: 'string',
		default: '',
		placeholder: 'Enter email address (required)',
		description: 'Email address to search for the Contact ID',
		displayOptions: {
			show: {
				searchForIdByEmail: [true],
			},
		},
	},
	{
		displayName: 'Contact ID',
		name: 'subscriberId',
		type: 'string',
		default: '',
		description: 'Select the contact to retrieve',
		placeholder: 'Enter contact ID (required)',
		// Hide Contact ID input if email search is enabled.
		displayOptions: {
			hide: {
				searchForIdByEmail: [true],
			},
		},
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
	let subscriberId: string;
	const searchForId = this.getNodeParameter('searchForIdByEmail', index, false) as boolean;

	// If the user toggles on "Search for ID by email", lookup the subscriber ID by email.
	if (searchForId) {
		const lookupEmail = this.getNodeParameter('lookupEmail', index) as string;
		if (!lookupEmail) {
			return handleError.call(this, 'Lookup email is missing, required for search');
		}
		try {
			const responseData = await apiRequest.call(this, 'POST', '/subscriber/search', { email: lookupEmail });
			// Assuming API returns an array with the first element as the Contact ID.
			if (Array.isArray(responseData) && responseData.length > 0) {
				subscriberId = responseData[0];
			} else {
				return handleError.call(this, 'No contact found for the provided lookup email');
			}
		} catch (error) {
			return handleError.call(this, error);
		}
	} else {
		// Otherwise, get the Contact ID entered manually.
		subscriberId = this.getNodeParameter('subscriberId', index) as string;
	}

	if (!subscriberId) {
		return handleError.call(this, 'Contact ID is missing');
	}

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
		await apiRequest.call(this, 'PUT', `/subscriber/${subscriberId}`, body);
		return this.helpers.returnJsonArray({ success: true });
	} catch (error) {
		return handleError.call(this, error);
	}
}
