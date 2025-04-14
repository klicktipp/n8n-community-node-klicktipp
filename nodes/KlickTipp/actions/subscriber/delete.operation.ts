import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Search for ID by email',
		name: 'searchForIdByEmail',
		type: 'boolean',
		default: false,
		description: 'Toggle this to search for a Contact ID using an Email Address',
	},
	{
		displayName: 'Email Address',
		name: 'email',
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
		placeholder: 'Enter contact ID (required)',
		description: 'Enter the ID of the contact you want to delete',
		// Hide Contact ID input if email search is enabled.
		displayOptions: {
			hide: {
				searchForIdByEmail: [true],
			},
		},
	},
];

const displayOptions = {
	show: {
		resource: ['subscriber'],
		operation: ['delete'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const searchForId = this.getNodeParameter('searchForIdByEmail', index, false) as boolean;
	let subscriberId: string;

	// When search is enabled, look up the subscriberId by email.
	if (searchForId) {
		const email = this.getNodeParameter('email', index) as string;
		if (!email) {
			return handleError.call(this, 'Email address is missing, required for search');
		}
		try {
			const responseData = await apiRequest.call(this, 'POST', '/subscriber/search', { email });
			// Check if the response contains a valid ID:
			if (Array.isArray(responseData) && responseData.length > 0) {
				subscriberId = responseData[0];
			} else {
				return handleError.call(this, 'No contact found for the provided email');
			}
		} catch (error) {
			return handleError.call(this, error);
		}
	} else {
		// When search is not enabled, get the subscriberId directly from the input.
		subscriberId = this.getNodeParameter('subscriberId', index) as string;
	}

	if (!subscriberId) {
		return handleError.call(this, 'Contact ID is missing');
	}

	try {
		await apiRequest.call(this, 'DELETE', `/subscriber/${subscriberId}`);
		return this.helpers.returnJsonArray({ success: true });
	} catch (error) {
		return handleError.call(this, error);
	}
}
