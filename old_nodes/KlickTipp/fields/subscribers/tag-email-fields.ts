import { INodeProperties } from 'n8n-workflow';

export const tagEmailFields: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		displayOptions: {
			show: {
				operation: ['tagEmail'],
			},
		},
		default: '',
		required: true,
		description: 'The email address of the subscriber',
	},
	{
		displayName: 'Tag IDs',
		name: 'tagIds',
		type: 'fixedCollection',
		default: {},
		placeholder: 'Add Tag ID',
		description: 'Add one or more Tag IDs',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				operation: ['tagEmail'],
			},
		},
		options: [
			{
				name: 'tagIdValues',
				displayName: 'Tag ID',
				values: [
					{
						displayName: 'Tag ID',
						name: 'tagId',
						type: 'string',
						default: '',
						description: 'Enter a single Tag ID',
						required: true,
					},
				],
			},
		],
		required: true,
	},
];
