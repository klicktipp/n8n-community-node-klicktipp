import { INodeProperties } from 'n8n-workflow';

export const autoresponderFields: INodeProperties[] = [
	{
		displayName: 'Autoresponder ID',
		name: 'autoresponderId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['resendAutoresponder'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the autoresponder to resend',
	},
	{
		displayName: 'Email',
		displayOptions: {
			show: {
				operation: ['resendAutoresponder'],
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