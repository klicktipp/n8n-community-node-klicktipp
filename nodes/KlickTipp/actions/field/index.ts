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
				name: 'List data fields',
				value: 'index',
				description:
					'Lists the IDs and names of all data fields.',
				action: 'Field index',
			},
			{
				name: 'Get data field',
				value: 'get',
				description: 'Gets the ID and the name of a data field.',
				action: 'Field get',
			},
		],
		default: 'index',
	},
	...index.description,
	...get.description,
];
