import { INodeProperties } from 'n8n-workflow';

import { subscriberCustomFields } from './subscriberCustomFields';

export const signInFields: INodeProperties[] = [
	// {
	// 	displayName: 'API Key',
	// 	displayOptions: {
	// 		show: {
	// 			operation: ['signIn'],
	// 		},
	// 	},
	// 	name: 'apiKey',
	// 	type: 'string',
	// 	typeOptions: {
	// 		password: true
	// 	},
	// 	default: '',
	// 	required: true,
	// 	description: 'The KlickTipp API key',
	// },
	{
		displayName: 'Email',
		displayOptions: {
			show: {
				operation: ['signIn'],
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
				operation: ['signIn'],
			},
		},
		name: 'smsNumber',
		type: 'string',
		default: '',
		required: true,
		description: 'SMS mobile number of the subscriber',
	},
	{
		displayName: 'Additional Fields',
		displayOptions: {
			show: {
				operation: ['signIn'],
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