import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, handleResponse, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Email',
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
		return handleError.call(this, 'The email address is required.');
	}

	try {
		const responseData = await apiRequest.call(this, 'POST', '/subscriber/search', { email });
		return handleResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
