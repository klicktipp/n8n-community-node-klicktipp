import { INodeProperties } from 'n8n-workflow';

export const searchSubscriberFields: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		displayOptions: {
			show: {
				operation: ['searchSubscriber'],
			},
		},
		default: '',
		required: true,
		description: 'The email address of the subscriber',
	},
];
