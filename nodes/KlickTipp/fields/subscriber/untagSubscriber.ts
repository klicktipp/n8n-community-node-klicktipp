import { INodeProperties } from 'n8n-workflow';

export const untagSubscriber: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		displayOptions: {
			show: {
				operation: ['untagEmail'],
			},
		},
		default: '',
		required: true,
		description: 'The email address of the subscriber',
	},
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['untagEmail'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the manual tag to be removed from the subscriber',
	},
]