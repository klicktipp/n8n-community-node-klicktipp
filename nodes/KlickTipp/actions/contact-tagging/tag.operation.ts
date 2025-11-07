import type { IDataObject, IExecuteFunctions, INodeProperties, NodeApiError } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Email Address',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'Enter email address (required)',
	},
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-multi-options
		displayName: 'Tag IDs',
		name: 'tagId',
		type: 'multiOptions',
		typeOptions: {
			loadOptionsMethod: 'getTagsWithoutPlaceholder',
		},
		default: [],
		description:
			'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
];

const displayOptions = {
	show: {
		resource: ['contact-tagging'],
		operation: ['tag'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const email = this.getNodeParameter('email', index) as string;
	const tagId = this.getNodeParameter('tagId', index) as number;

	if (!email) {
		return handleError.call(this, 'Email is missing');
	}

	if (!tagId) {
		return handleError.call(this, 'Tag ID is missing');
	}

	const body: IDataObject = {
		email,
		tagids: tagId,
	};

	try {
		await apiRequest.call(this, 'POST', '/subscriber/tag', body);
		return this.helpers.returnJsonArray({ success: true });
	} catch (error) {
		return handleError.call(this, error as NodeApiError);
	}
}
