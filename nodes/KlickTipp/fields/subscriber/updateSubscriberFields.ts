import { INodeProperties } from 'n8n-workflow';
import { subscriberCustomFields } from '../subscriberCustomFields';

export const updateSubscriberFields: INodeProperties[] = [
	{
		displayName: 'Subscriber ID',
		name: 'subscriberId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['updateSubscriber'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the subscriber',
	},
	{
		displayName: 'Email',
		displayOptions: {
			show: {
				operation: ['updateSubscriber'],
			},
		},
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		description: 'The email address of the subscriber',
	},
	{
		displayName: 'SMS Number',
		displayOptions: {
			show: {
				operation: ['updateSubscriber'],
			},
		},
		name: 'smsNumber',
		type: 'string',
		default: '',
		description: 'SMS mobile number of the recipient',
	},
	{
		displayName: 'Additional Fields',
		displayOptions: {
			show: {
				operation: ['updateSubscriber'],
			},
		},
		name: 'fields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Additional data of the recipient',
		options: subscriberCustomFields,
	},
];