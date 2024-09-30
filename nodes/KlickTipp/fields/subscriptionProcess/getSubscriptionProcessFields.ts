import { INodeProperties } from 'n8n-workflow';

export const getSubscriptionProcessFields: INodeProperties[] = [
	{
		displayName: 'List ID',
		name: 'listId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['getSubscriptionProcess'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the subscription process (list) to retrieve',
	}
];