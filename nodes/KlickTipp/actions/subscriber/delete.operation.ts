import type { IExecuteFunctions, INodeProperties, NodeApiError } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, updateDisplayOptions, resolveSubscriberId } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Identify Contact By',
		name: 'identifierType',
		type: 'options',
		options: [
			{
				name: 'Contact ID',
				value: 'id',
			},
			{
				name: 'Email Address',
				value: 'email',
			},
		],
		default: 'id',
	},
	{
		displayName: 'Contact ID',
		name: 'subscriberId',
		type: 'string',
		default: '',
		placeholder: 'Enter contact ID (required)',
		displayOptions: {
			show: {
				identifierType: ['id'],
			},
		},
	},
	{
		displayName: 'Email Address',
		name: 'lookupEmail',
		type: 'string',
		default: '',
		placeholder: 'Enter email address (required)',
		displayOptions: {
			show: {
				identifierType: ['email'],
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
	try {
		const subscriberId = await resolveSubscriberId.call(this, index);

		await apiRequest.call(this, 'DELETE', `/subscriber/${subscriberId}`);
		return this.helpers.returnJsonArray({ success: true });
	} catch (error) {
		return handleError.call(this, error as NodeApiError);
	}
}
