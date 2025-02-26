import type { INodeProperties } from 'n8n-workflow';
import * as create from './create.operation';
import * as del from './delete.operation';
import * as index from './index.operation';
import * as get from './get.operation';
import * as update from './update.operation';

export { create, del as delete, get, index, update };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tag'],
			},
		},
		options: [
			{
				name: 'Create tag',
				value: 'create',
				description: 'Creates a new manual tag.',
				action: 'Tag create',
			},
			{
				name: 'Delete tag',
				value: 'delete',
				description: 'Deletes a tag.',
				action: 'Tag delete',
			},
			{
				name: 'Get tag',
				value: 'get',
				description: 'Returns the name and description of a tag.',
				action: 'Tag get',
			},
			{
				name: 'List tags',
				value: 'index',
				description:
					'Lists the IDs and names of all tags.',
				action: 'Tag index',
			},
			{
				name: 'Update tag',
				value: 'update',
				description: 'Updates a tag.',
				action: 'Tag update',
			},
		],
		default: 'index',
	},
	...create.description,
	...del.description,
	...get.description,
	...update.description,
];
