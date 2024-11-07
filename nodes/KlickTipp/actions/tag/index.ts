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
				name: 'Tag Create',
				value: 'create',
				description: 'Creates a new manual tag',
				action: 'Tag create',
			},
			{
				name: 'Tag Delete',
				value: 'delete',
				description: 'Deletes a manual tag or SmartLink',
				action: 'Tag delete',
			},
			{
				name: 'Tag Get',
				value: 'get',
				description: 'Returns the name and description of a tag',
				action: 'Tag get',
			},
			{
				name: 'Tag Index',
				value: 'index',
				description: 'Returns an associative array <code>[tag_id] => [tag_name]</code> of all manual tags and SmartLinks',
				action: 'Tag index',
			},
			{
				name: 'Tag Update',
				value: 'update',
				description: 'Updates a manual tag or SmartLink',
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
