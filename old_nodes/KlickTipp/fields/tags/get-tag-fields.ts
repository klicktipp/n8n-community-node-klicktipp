import { INodeProperties } from 'n8n-workflow';

export const getTagFields: INodeProperties[] = [
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['getTag'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the tag to retrieve',
	},
];
