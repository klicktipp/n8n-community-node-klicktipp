import type { INodeProperties } from 'n8n-workflow';

import * as index from './index.operation';

export { index };

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
				name: 'Field index',
				value: 'index',
				description:
					'Returns an associative array <code>[field_id] => [field_name]</code> of all data fields.',
				action: 'index',
			},
		],
		default: 'index',
	},
	...index.description,
];
