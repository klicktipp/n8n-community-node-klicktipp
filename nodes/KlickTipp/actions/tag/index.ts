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
        action: 'Create a new tag',
      },
      {
        name: 'Delete tag',
        value: 'delete',
        description: 'Deletes a manual tag or SmartLink.',
        action: 'Delete a tag',
      },
      {
        name: 'Get tag',
        value: 'get',
        description: 'Returns the name and description of a tag.',
        action: 'Retrieve a tag',
      },
      {
        name: 'Tag index',
        value: 'index',
        description: 'Returns an associative array <code>[tag_id] => [tag_name]</code> of all manual tags and SmartLinks.',
        action: 'List all tags',
      },
      {
        name: 'Update tag',
        value: 'update',
        description: 'Updates a manual tag or SmartLink.',
        action: 'Modify a tag',
      },
    ],
    default: 'index',
  },
  ...create.description,
  ...del.description,
  ...get.description,
  ...update.description,
];