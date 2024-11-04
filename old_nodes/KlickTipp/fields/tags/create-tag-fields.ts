import { INodeProperties } from 'n8n-workflow';

export const createTagFields: INodeProperties[] = [
	{
		displayName: 'Tag Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createTag'],
			},
		},
		default: '',
		required: true,
		description: 'The name of the tag to be created',
	},
	{
		displayName: 'Tag Description',
		name: 'text',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['createTag'],
			},
		},
		default: '',
		description: 'An additional description of the tag',
	},
];
