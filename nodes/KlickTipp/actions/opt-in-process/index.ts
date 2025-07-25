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
				name: 'Get Opt-in Process',
				value: 'get',
				description: 'Returns the complete data of an opt-in process',
				action: 'Get opt in process',
			},
			{
				name: 'Search Redirect URL',
				value: 'getRedirect',
				description: 'Search the redirection URL for a specific opt-in process',
				action: 'Search redirect url',
			},
			{
				name: 'List Opt-in Processes',
				value: 'index',
				description: 'Lists the IDs and names of all opt-in processes',
				action: 'List opt in processes',
			},
		],
		default: 'index',
	},
	...getRedirect.description,
	...get.description,
];
