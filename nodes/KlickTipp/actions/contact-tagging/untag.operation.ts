import type { IDataObject, IExecuteFunctions, INodeProperties, NodeApiError } from 'n8n-workflow';
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
	{
		displayName: 'Tag Name or ID',
		name: 'tagId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTags',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: { show: { '@version': [1, 2, 3] } },
	},
	{
		displayName: 'Tag Names or IDs',
		name: 'tagIds',
		type: 'multiOptions',
		typeOptions: { loadOptionsMethod: 'getTagsWithoutPlaceholder' },
		default: [],
		description:
			'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: { show: { '@version': [4] } },
	},
	{
		displayName: 'Each selected tag creates a separate untag call and increases API usage.',
		name: 'untagUsageNotice',
		type: 'notice',
		default: '',
		displayOptions: { show: { '@version': [4] } },
	},
];

const displayOptions = {
	show: {
		resource: ['contact-tagging'],
		operation: ['untag'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const email = this.getNodeParameter('email', index) as string;
	const version = this.getNode().typeVersion ?? 1;
	const tagIds =
		version >= 4
			? [...new Set((this.getNodeParameter('tagIds', index, []) as string[]).filter(Boolean))]
			: [this.getNodeParameter('tagId', index, '') as string].filter(Boolean);

	if (!email) {
		return handleError.call(this, 'Email is missing');
	}

	if (!tagIds.length) {
		return handleError.call(this, 'Tag ID is missing');
	}

	for (const tagId of tagIds) {
		const body: IDataObject = { email, tagid: tagId };
		try {
			await apiRequest.call(this, 'POST', '/subscriber/untag', body);
		} catch (error) {
			return handleError.call(
				this,
				error as NodeApiError,
				version >= 4 ? `Failed to untag tag ID "${tagId}".` : undefined,
			);
		}
	}
	return version >= 4
		? handleObjectResponse.call(this, { success: true }, index)
		: this.helpers.returnJsonArray({ success: true });
}
