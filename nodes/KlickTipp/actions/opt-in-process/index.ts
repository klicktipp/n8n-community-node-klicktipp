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
				name: 'Opt-in Process Get',
				value: 'get',
				description: 'Returns the name of an opt-in process',
				action: 'Process get',
			},
			{
				name: 'Opt-in Process Index',
				value: 'index',
				description:
					'Returns an associative array <code>[double_optin_process_id] => [double_optin_process_name]</code> of all opt-in processes',
				action: 'Process index',
			},
			{
				name: 'Opt-in Process Redirect URL',
				value: 'getRedirect',
				description:
					"Returns the URL of the opt-in confirmation page for a subscriber's opt-in process",
				action: 'Process redirect URL',
			},
		],
		default: 'index',
	},
	...getRedirect.description,
	...get.description,
];
