import { INodeProperties } from 'n8n-workflow';

export const signOutFields: INodeProperties[] = [
	{
		displayName: 'API Key',
		displayOptions: {
			show: {
				operation: ['signOut'],
			},
		},
		name: 'apiKey',
		type: 'string',
		typeOptions: {
			password: true
		},
		default: '',
		required: true,
		description: 'The KlickTipp API key',
	},
	{
		displayName: 'Email',
		displayOptions: {
			show: {
				operation: ['signOut'],
			},
		},
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		required: true,
		description: 'The email address of the subscriber',
	}
];