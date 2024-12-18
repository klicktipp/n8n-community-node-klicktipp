import type { INodeProperties } from 'n8n-workflow';

import * as index from './index.operation';
import * as get from './get.operation';

export { index, get };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['field'],
			},
		},
		options: [
			{
				name: 'Field Index',
				value: 'index',
				description:
					'Returns an associative array in the format <code>{ field_id: field_name }</code>, where each key corresponds to the unique field ID, and its value is the associated field name',
				action: 'Field index',
			},
			{
				name: 'Field Get',
				value: 'get',
				description: 'Returns the name and description of a field',
				action: 'Field get',
			},
		],
		default: 'index',
	},
	...index.description,
	...get.description
];
