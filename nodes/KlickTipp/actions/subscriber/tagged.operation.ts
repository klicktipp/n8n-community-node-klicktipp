import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, handleResponse, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTags',
		},
		default: '',
		description: 'Select the tag (required)',
	},
];

const displayOptions = {
	show: {
		resource: ['subscriber'],
		operation: ['tagged'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const tagId = this.getNodeParameter('tagId', index) as number;

	if (!tagId) {
		return handleError.call(this, 'The tag ID is required.');
	}

	try {
		const responseData = await apiRequest.call(this, 'POST', '/subscriber/tagged', { tagid: tagId });
		return handleResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
