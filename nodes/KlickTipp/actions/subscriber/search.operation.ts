import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, handleObjectResponse, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Email Address',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'Enter email address (required)',
	},
];

const displayOptions = {
	show: {
		resource: ['subscriber'],
		operation: ['search'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const email = this.getNodeParameter('email', index) as string;

	if (!email) {
		return handleError.call(this, 'Email is missing');
	}

	try {
		const responseData = await apiRequest.call(this, 'POST', '/subscriber/search', { email });

		const enhancedData = {
			id: responseData[0],
		};

		return handleObjectResponse.call(this, enhancedData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
