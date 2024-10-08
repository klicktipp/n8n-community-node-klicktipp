import { INodeProperties } from 'n8n-workflow';

import {
	createSubscriberFields,
	unsubscribeFields,
	credentialsFields,
	updateSubscriberFields,
	getSubscriberFields,
	searchSubscriberFields,
	createTagFields,
	updateTagFields,
	getTagFields,
	deleteTagFields,
	getSubscriptionProcessFields,
	getSubscriptionProcessRedirectionUrlFields,
	deleteSubscriberFields,
	tagSubscriber,
	untagSubscriber,
	signInFields,
	signOffFields,
	signOutFields,
	autoresponderFields,
	getSubscribersByTagIdFields
} from './fields';

import {
	createTag,
	getTag,
	fetchTags,
	updateTag,
	deleteTag,
	login,
	logout,
	signIn,
	signOut,
	signOff,
	subscribe,
	searchSubscriber,
	getSubscriptionProcessRedirectionUrl,
	deleteSubscriber,
	fetchSubscribers,
	unsubscribe,
	tagEmail,
	untagEmail,
	fetchContactFields,
	getSubscribersByTagId,
	fetchSubscriptionProcesses,
	getSubscriberById,
	getSubscriptionProcessById,
	resendAutoresponder,
	updateSubscriberById,
} from './operation-options';

export const klickTippOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			createTag,
			getTag,
			fetchTags,
			updateTag,
			deleteTag,
			login,
			logout,
			signIn,
			signOut,
			signOff,
			subscribe,
			searchSubscriber,
			getSubscriptionProcessRedirectionUrl,
			deleteSubscriber,
			fetchSubscribers,
			unsubscribe,
			tagEmail,
			untagEmail,
			fetchContactFields,
			getSubscribersByTagId,
			fetchSubscriptionProcesses,
			getSubscriberById,
			getSubscriptionProcessById,
			resendAutoresponder,
			updateSubscriberById,
		],
		default: 'login',
	},
];

export const klickTippFields: INodeProperties[] = [
	...credentialsFields,
	...createTagFields,
	...updateTagFields,
	...getTagFields,
	...deleteTagFields,
	...getSubscriberFields,
	...searchSubscriberFields,
	...createSubscriberFields,
	...tagSubscriber,
	...untagSubscriber,
	...unsubscribeFields,
	...updateSubscriberFields,
	...deleteSubscriberFields,
	...getSubscriptionProcessFields,
	...getSubscriptionProcessRedirectionUrlFields,
	...signInFields,
	...signOffFields,
	...signOutFields,
	...autoresponderFields,
	...getSubscribersByTagIdFields
];
