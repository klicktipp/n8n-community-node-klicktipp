import { INodeProperties } from 'n8n-workflow';

export const unsubscribeFields: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		displayOptions: {
			show: {
				operation: ['unsubscribe'],
			},
		},
		default: '',
		required: true,
		description: 'The email address of the subscriber',
	}
];