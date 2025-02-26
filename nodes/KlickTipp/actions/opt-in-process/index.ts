import type { INodeProperties } from 'n8n-workflow';

import * as index from './index.operation';
import * as get from './get.operation';
import * as getRedirect from './get-redirect.operation';

export { index, get, getRedirect };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['opt-in'],
			},
		},
		options: [
			{
				name: 'Get opt-in process',
				value: 'get',
				description: 'Returns the complete data of an opt-in process.',
				action: 'Process get',
			},
			{
				name: 'List opt-in processes',
				value: 'index',
				description:
					'Lists the IDs and names of all opt-in processes.',
				action: 'Process index',
			},
			{
				name: 'Get redirect URL',
				value: 'getRedirect',
				description:
					"Gets the redirection URL for a specific opt-in process.",
				action: 'Process redirect URL',
			},
		],
		default: 'index',
	},
	...getRedirect.description,
	...get.description,
];
