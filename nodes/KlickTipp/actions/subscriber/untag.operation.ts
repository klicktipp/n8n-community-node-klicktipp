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
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTags',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
];

const displayOptions = {
	show: {
		resource: ['subscriber'],
		operation: ['untag'],
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
		tagid: tagId,
	};

	try {
		await apiRequest.call(this, 'POST', '/subscriber/untag', body);
		return this.helpers.returnJsonArray({ success: true });
	} catch (error) {
		return handleError.call(this, error);
	}
}
