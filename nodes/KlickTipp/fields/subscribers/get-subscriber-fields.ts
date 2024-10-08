import { INodeProperties } from 'n8n-workflow';

export const getSubscriberFields: INodeProperties[] = [
	{
		displayName: 'Subscriber ID',
		name: 'subscriberId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['getSubscriber'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the subscriber',
	},
];
