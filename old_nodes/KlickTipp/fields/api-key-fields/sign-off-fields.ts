import { INodeProperties } from 'n8n-workflow';

export const signOffFields: INodeProperties[] = [
	{
		displayName: 'API Key',
		displayOptions: {
			show: {
				operation: ['signOff'],
			},
		},
		name: 'apiKey',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		required: true,
		description: 'The KlickTipp API key',
	},
	{
		displayName: 'Email',
		displayOptions: {
			show: {
				operation: ['signOff'],
			},
		},
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		required: true,
		description: 'The email address of the subscriber',
	},
];
