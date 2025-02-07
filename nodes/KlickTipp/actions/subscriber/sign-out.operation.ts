import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, updateDisplayOptions } from '../../utils/utilities';

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
		operation: ['signOut'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const credentials = await this.getCredentials('klickTippApi');
	if (!credentials) {
		return handleError.call(
			this,
			'Missing credentials. Please check that your KlickTipp API credentials are configured correctly',
		);
	}

	const apiKey = credentials.apiKey as string;
	const email = this.getNodeParameter('email', index) as string;

	if (!email) {
		return handleError.call(this, 'The email address is required.');
	}

	if (!apiKey) {
		return handleError.call(this, 'The API key is required.');
	}

	const body: IDataObject = {
		email,
		apikey: apiKey,
	};

	try {
		await apiRequest.call(this, 'POST', '/subscriber/signout', body);
		return this.helpers.returnJsonArray({ success: true });
	} catch (error) {
		return handleError.call(this, error);
	}
}
