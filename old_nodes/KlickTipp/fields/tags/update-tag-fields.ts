import { INodeProperties } from 'n8n-workflow';

export const updateTagFields: INodeProperties[] = [
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['updateTag'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the tag to retrieve',
	},
	{
		displayName: 'Tag Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['updateTag'],
			},
		},
		default: '',
		description: 'The name of the tag to be updated',
	},
	{
		displayName: 'Tag Description',
		name: 'text',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['updateTag'],
			},
		},
		default: '',
		description: 'An additional description of the tag',
	},
];
