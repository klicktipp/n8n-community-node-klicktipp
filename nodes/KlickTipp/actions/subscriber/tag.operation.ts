import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, handleResponse, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'Enter email address (required)',
	},
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'multiOptions',
		typeOptions: {
			loadOptionsMethod: 'getTags',
		},
		default: [],
		description: 'Select the tag (required)',
		required: true,
	},
];

const displayOptions = {
	show: {
		resource: ['subscriber'],
		operation: ['tag'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const email = this.getNodeParameter('email', index) as string;
	const tagId = this.getNodeParameter('tagId', index) as number;

	if (!email) {
		return handleError.call(this, 'The email address is required.');
	}

	if (!tagId) {
		return handleError.call(this, 'The tag ID is required.');
	}

	const body: IDataObject = {
		email,
		tagids: tagId,
	};

	try {
		const responseData = await apiRequest.call(this, 'POST', '/subscriber/tag', body);
		return handleResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
