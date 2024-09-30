import { INodeProperties } from 'n8n-workflow';

export const deleteTagFields: INodeProperties[]  = [
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		displayOptions: {
			show: {
				operation: ['deleteTag'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the tag to retrieve',
	},
];