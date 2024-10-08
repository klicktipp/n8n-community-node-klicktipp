import { INodeProperties } from 'n8n-workflow';

export const authFields: INodeProperties[] = [
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['login'],
			},
		},
		default: '',
		required: true,
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		displayOptions: {
			show: {
				operation: ['login'],
			},
		},
		default: '',
		required: true,
	},
];
