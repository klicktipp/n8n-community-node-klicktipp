import type { INodeProperties } from 'n8n-workflow';

import * as subscribe from './subscribe.operation';
import * as unsubscribe from './unsubscribe.operation';
import * as index from './index.operation';
import * as del from './delete.operation';
import * as get from './get.operation';
import * as search from './search.operation';
import * as signIn from './sign-in.operation';
import * as signOff from './sign-off.operation';
import * as signOut from './sign-out.operation';
import * as tag from './tag.operation';
import * as tagged from './tagged.operation';
import * as untag from './untag.operation';
import * as update from './update.operation';

export {
	subscribe,
	unsubscribe,
	index,
	del as delete,
	search,
	get,
	signIn,
	signOff,
	signOut,
	tag,
	tagged,
	untag,
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
				name: 'Delete contact',
				value: 'delete',
				description: 'Deletes a contact.',
				action: 'Subscriber delete',
			},
			{
				name: 'Get contact',
				value: 'get',
				description:
					'Returns the complete data of a contact.',
				action: 'Subscriber get',
			},
			{
				name: 'List contacts',
				value: 'index',
				description:
					'Lists the IDs of all active contacts.',
				action: 'Subscriber index',
			},
			{
				name: 'Get contact ID',
				value: 'search',
				description:
					'Returns the contact ID for an email address.',
				action: 'Subscriber search',
			},
			{
				name: 'Add contact via API key',
				value: 'signIn',
				description:
					'Creates or updates a contact and associates the tag linked to the API key.',
				action: 'Subscriber signin',
			},
			{
				name: 'Unsubscribe contact via API key',
				value: 'signOff',
				description: 'Unsubscribes a contact via the API key and prevents further communication.',
				action: 'Subscriber signoff',
			},
			{
				name: 'Remove contact via API key',
				value: 'signOut',
				description: 'Removes the tag of a contact associated with the API key.',
				action: 'Subscriber signout',
			},
			{
				name: 'Add or update contact',
				value: 'subscribe',
				description:
					'Adds a new contact. If a contact with the same email already exists, it will be updated.',
				action: 'Subscriber subscribe',
			},
			{
				name: 'Tag contact',
				value: 'tag',
				description: 'Adds one or more tags to a contact.',
				action: 'Subscriber tag',
			},
			{
				name: 'List tagged contacts',
				value: 'tagged',
				description:
					'Lists the IDs and tagging timestamps of all tagged contacts.',
				action: 'Subscriber tagged',
			},
			{
				name: 'Unsubscribe contact',
				value: 'unsubscribe',
				description: 'Unsubscribes a contact, preventing further communication.',
				action: 'Subscriber unsubscribe',
			},
			{
				name: 'Untag contact',
				value: 'untag',
				description: 'Removes a tag from a contact.',
				action: 'Subscriber untag',
			},
			{
				name: 'Update contact',
				value: 'update',
				description: 'Updates a contact.',
				action: 'Subscriber update',
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
	...signIn.description,
	...signOff.description,
	...signOut.description,
	...tag.description,
	...tagged.description,
	...untag.description,
	...update.description,
];
