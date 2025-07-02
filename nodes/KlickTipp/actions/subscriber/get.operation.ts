import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, handleObjectResponse, updateDisplayOptions } from '../../utils/utilities';

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
		description: 'Enter the ID of the contact you want to retrieve',
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
];

const displayOptions = {
	show: {
		resource: ['subscriber'],
		operation: ['get'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const identifierType = this.getNodeParameter('identifierType', index) as string;
	let subscriberId: string;

	if (identifierType === 'email') {
		const email = this.getNodeParameter('lookupEmail', index) as string;

		if (!email) {
			return handleError.call(this, 'Email address is missing');
		}

		try {
			const response = await apiRequest.call(this, 'POST', '/subscriber/search', { email });

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

	try {
		const responseData = await apiRequest.call(this, 'GET', `/subscriber/${subscriberId}`);
		return handleObjectResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
