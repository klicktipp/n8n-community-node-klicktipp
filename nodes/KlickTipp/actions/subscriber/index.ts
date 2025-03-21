import type { INodeProperties } from 'n8n-workflow';

import * as subscribe from './subscribe.operation';
import * as unsubscribe from './unsubscribe.operation';
import * as index from './index.operation';
import * as del from './delete.operation';
import * as get from './get.operation';
import * as search from './search.operation';
import * as tagged from './tagged.operation';
import * as update from './update.operation';

export {
	subscribe,
	unsubscribe,
	index,
	del as delete,
	search,
	get,
	tagged,
	update,
};

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['subscriber'],
			},
		},
		options: [
			{
				name: 'Add or Update Contact',
				value: 'subscribe',
				description:
					'Adds a new contact. If a contact with the same email already exists, it will be updated.',
				action: 'Add or update contact',
			},
			{
				name: 'Delete Contact',
				value: 'delete',
				description: 'Deletes a contact',
				action: 'Delete contact',
			},
			{
				name: 'Get Contact',
				value: 'get',
				description: 'Returns the complete data of a contact',
				action: 'Get contact',
			},
			{
				name: 'Get Contact ID',
				value: 'search',
				description: 'Returns the contact ID for an email address',
				action: 'Get contact id',
			},
			{
				name: 'List Contacts',
				value: 'index',
				description: 'Lists the IDs of all active contacts',
				action: 'List contacts',
			},
			{
				name: 'List Tagged Contacts',
				value: 'tagged',
				description: 'Lists the IDs and tagging timestamps of all tagged contacts',
				action: 'List tagged contacts',
			},
			{
				name: 'Unsubscribe Contact',
				value: 'unsubscribe',
				description: 'Unsubscribes a contact, preventing further communication',
				action: 'Unsubscribe contact',
			},
			{
				name: 'Update Contact',
				value: 'update',
				description: 'Updates a contact',
				action: 'Update contact',
			},
		],
		default: 'index',
	},
	...subscribe.description,
	...unsubscribe.description,
	...index.description,
	...del.description,
	...get.description,
	...search.description,
	...tagged.description,
	...update.description,
];
