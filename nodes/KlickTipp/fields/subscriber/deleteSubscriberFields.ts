import { INodeProperties } from 'n8n-workflow';

export const deleteSubscriberFields: INodeProperties[] = [
	{
		displayName: 'Subscriber ID',
		name: 'subscriberId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['deleteSubscriber'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the subscriber',
	}
];