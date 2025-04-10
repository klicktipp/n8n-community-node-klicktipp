import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {
	handleError,
	handleObjectResponse,
	updateDisplayOptions,
	transformFieldNames,
} from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Contact ID',
		name: 'subscriberId',
		type: 'string',
		default: '',
		description: 'Enter the ID of the contact you want to retrieve',
		placeholder: 'Enter contact ID (required)',
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
	const subscriberId = this.getNodeParameter('subscriberId', index) as string;

	if (!subscriberId) {
		return handleError.call(this, 'Contact ID is missing');
	}

	try {
		const responseData = await apiRequest.call(this, 'GET', `/subscriber/${subscriberId}`);

		// Get the field mapping from the API
		const fieldMappings = await apiRequest.call(this, 'GET', '/field');

		// Transform the field keys using the helper function
		const transformedResponse = transformFieldNames(responseData, fieldMappings);

		return handleObjectResponse.call(this, transformedResponse, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
