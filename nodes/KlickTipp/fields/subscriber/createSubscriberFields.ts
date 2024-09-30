import { INodeProperties } from 'n8n-workflow';
import { subscriberCustomFields } from '../subscriberCustomFields';

export const createSubscriberFields: INodeProperties[] = [
	{
		displayName: 'Email',
		displayOptions: {
			show: {
				operation: ['subscribe'],
			},
		},
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		required: true,
		description: 'The email address of the subscriber',
	},
	{
		displayName: 'SMS Number',
		displayOptions: {
			show: {
				operation: ['subscribe'],
			},
		},
		name: 'smsNumber',
		type: 'string',
		default: '',
		description: 'SMS mobile number of the recipient',
	},
	{
		displayName: 'List ID',
		displayOptions: {
			show: {
				operation: ['subscribe'],
			},
		},
		name: 'listId',
		type: 'string',
		default: '',
		description: 'ID of the double opt-in process (list)',
	},
	{
		displayName: 'Tag ID',
		displayOptions: {
			show: {
				operation: ['subscribe'],
			},
		},
		name: 'tagId',
		type: 'string',
		default: '',
		description: 'ID of the tag with which your contacts should be tagged',
	},
	{
		displayName: 'Additional Fields',
		displayOptions: {
			show: {
				operation: ['subscribe'],
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