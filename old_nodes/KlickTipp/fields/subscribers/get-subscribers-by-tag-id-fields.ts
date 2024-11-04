import { INodeProperties } from 'n8n-workflow';

export const getSubscribersByTagIdFields: INodeProperties[] = [
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['getSubscribersByTagId'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the subscriber',
	},
];
