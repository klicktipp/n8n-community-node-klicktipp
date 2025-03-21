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
				name: 'Create Tag',
				value: 'create',
				description: 'Creates a new manual tag',
				action: 'Create tag',
			},
			{
				name: 'Delete Tag',
				value: 'delete',
				description: 'Deletes a tag',
				action: 'Delete tag',
			},
			{
				name: 'Get Tag',
				value: 'get',
				description: 'Returns the name and description of a tag',
				action: 'Get tag',
			},
			{
				name: 'List Tags',
				value: 'index',
				description: 'Lists the IDs and names of all tags',
				action: 'List tags',
			},
			{
				name: 'Update Tag',
				value: 'update',
				description: 'Updates a tag',
				action: 'Update tag',
			},
		],
		default: 'index',
	},
	...create.description,
	...del.description,
	...get.description,
	...update.description,
];
