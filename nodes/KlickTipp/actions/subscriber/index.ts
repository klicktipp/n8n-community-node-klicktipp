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
				name: 'Subscriber subscribe',
				value: 'subscribe',
				description:
					'Adds or updates a subscriber. The subscriber can be identified by their email address or SMS number, with an optional opt-in process, tag, and fields.',
				action: 'Add a subscriber',
			},
			{
				name: 'Subscriber unsubscribe',
				value: 'unsubscribe',
				description: 'Unsubscribes a subscriber.',
				action: 'Unsubscribes a subscriber',
			},
			{
				name: 'Subscriber index',
				value: 'index',
				description:
					'Returns an associative array <code>[id] => [subscriber_id]</code> of all active subscribers. Use the <code>Subscriber get</code> node to retrieve detailed information about a subscriber.',
				action: 'Subscriber index',
			},
			{
				name: 'Subscriber delete',
				value: 'delete',
				description: 'Deletes a subscriber.',
				action: 'Deletes a subscriber',
			},
			{
				name: 'Subscriber get',
				value: 'get',
				description:
					'Returns all available information about a subscriber. For example, you can use it to check when a contact received, opened, or clicked in a specific email.',
				action: 'Get a subscriber',
			},
			{
				name: 'Subscriber search',
				value: 'search',
				description:
					'Returns the subscriber ID for an email address. Use the <code>Subscriber get</code> node to retrieve detailed information about this subscriber.',
				action: 'Search a subscriber',
			},
			{
				name: 'Subscriber signin',
				value: 'signIn',
				description:
					'Adds or updates a subscriber using an API key. The subscriber can be identified by their email address or SMS number, with optional fields.',
				action: 'Subscriber signin',
			},
			{
				name: 'Subscriber signoff',
				value: 'signOff',
				description: 'Unsubscribes a subscriber using an API key.',
				action: 'Subscriber signoff',
			},
			{
				name: 'Subscriber signout',
				value: 'signOut',
				description:
					'Removes the manual tag or SmartLink defined in the API key from a subscriber.',
				action: 'Subscriber signout',
			},
			{
				name: 'Subscriber tag',
				value: 'tag',
				description: 'Tags a subscriber with a manual tag or SmartLink.',
				action: 'Subscriber tag',
			},
			{
				name: 'Subscriber tagged',
				value: 'tagged',
				description:
					'Returns an associative array <code>[subscriber_id] => [subscription_timestamp]</code> of subscribers who have been tagged with a specific tag. Use the <code>Subscriber get</code> node to retrieve detailed information about a subscriber.',
				action: 'Subscriber tagged',
			},
			{
				name: 'Subscriber untag',
				value: 'untag',
				description: 'Removes a manual tag or SmartLink from a subscriber.',
				action: 'Subscriber untag',
			},
			{
				name: 'Subscriber update',
				value: 'update',
				description: 'Updates the data fields, email address, or SMS number of a subscriber.',
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
