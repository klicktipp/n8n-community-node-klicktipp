import { INodeProperties } from 'n8n-workflow';

export const getSubscriptionProcessRedirectionUrl: INodeProperties[]  = [
	{
		displayName: 'List ID',
		name: 'listId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['redirectSubscriptionProcess'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the subscription process (list) to retrieve',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		displayOptions: {
			show: {
				operation: ['redirectSubscriptionProcess'],
			},
		},
		default: '',
		required: true,
		description: 'The email address of the subscriber',
	}
];