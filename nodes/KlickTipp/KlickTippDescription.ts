import {INodeProperties} from 'n8n-workflow';

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
	getSubscriptionProcessRedirectionUrl,
	deleteSubscriberFields,
	tagSubscriber,
	untagSubscriber,
	signInFields,
	signOffFields,
	signOutFields,
	autoresponderFields
} from './fields';

export const klickTippOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create Tag',
				value: 'createTag',
				description: 'Create a new manual tag in KlickTipp',
				routing: {
					request: {
						method: 'POST',
						url: '/tag',
						body: {
							name: '={{$parameter["name"]}}',
							text: '={{$parameter["text"]}}',
						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									tagId: '={{$responseItem.id}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Create a new tag',
			},
			{
				name: 'Delete Subscriber',
				value: 'deleteSubscriber',
				description: 'Delete a subscriber by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/subscriber/{{$parameter["subscriberId"]}}',
						headers: {
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									success: '={{!$responseItem.error}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Delete a subscriber by ID',
			},
			{
				name: 'Delete Tag',
				value: 'deleteTag',
				description: 'Delete a manual tag in KlickTipp',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tag/{{$parameter["tagId"]}}',
						headers: {
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									success: '={{!$responseItem.error}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Delete a tag',
			},
			{
				name: 'Fetch Fields',
				value: 'fetchFields',
				description: 'Fetch manual tags from KlickTipp API',
				routing: {
					request: {
						method: 'GET',
						url: '/field',
						headers: {
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Fetch a list of fields',
			},
			{
				name: 'Fetch Subscribers',
				value: 'fetchSubscribers',
				description: 'Fetch subscription processes from KlickTipp API',
				routing: {
					request: {
						method: 'GET',
						url: '/subscriber',
						headers: {
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
								},
							},
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Fetch a subscribers',
			},
			{
				name: 'Fetch Subscription Processes',
				value: 'fetchSubscriptionProcesses',
				description: 'Fetch subscription processes from KlickTipp API',
				routing: {
					request: {
						method: 'GET',
						url: '/list',
						headers: {
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
								},
							},
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Fetch a list of subscription processes',
			},
			{
				name: 'Fetch Tags',
				value: 'fetchTags',
				description: 'Fetch manual tags from KlickTipp API',
				routing: {
					request: {
						method: 'GET',
						url: '/tag',
						headers: {
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Fetch a list of tags',
			},
			{
				name: 'Get Subscriber',
				value: 'getSubscriber',
				description: 'Get information for a specific subscriber',
				routing: {
					request: {
						method: 'GET',
						url: '=/subscriber/{{$parameter["subscriberId"]}}',
						headers: {
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Get a specific subscriber information by ID',
			},
			{
				name: 'Get Subscription Process',
				value: 'getSubscriptionProcess',
				description: 'Get a specific subscription process by its ID from KlickTipp API',
				routing: {
					request: {
						method: 'GET',
						url: '=/list/{{$parameter["listId"]}}',
						headers: {
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
								},
							},
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Get a specific subscription process by ID',
			},
			{
				name: 'Get Tag Definition',
				value: 'getTag',
				description: 'Get the definition of a specific tag from KlickTipp API',
				routing: {
					request: {
						method: 'GET',
						url: '=/tag/{{$parameter["tagId"]}}',
						headers: {
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Get a specific tag by ID',
			},
			{
				name: 'Login',
				value: 'login',
				description: 'Logs into KlickTipp API',
				routing: {
					request: {
						method: 'POST',
						url: '/account/login',
						body: {
							username: '={{$parameter.username}}',
							password: '={{$parameter.password}}',
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									'klicktippSessionId': '={{$responseItem.sessid}}',
									'klicktippSessionName': '={{$responseItem.session_name}}',
								},
							},
						],
					},
				},
				action: 'Login',
			},
			{
				name: 'Logout',
				value: 'logout',
				description: 'Logs out from the KlickTipp API',
				routing: {
					request: {
						method: 'POST',
						url: '/account/logout',
						headers: {
							'Cookie': '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
						body: {
							debug: '={{$getWorkflowStaticData("node").klickTippSessionName}}'
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									success: '={{!$responseItem.error}}',
								},
							},
						],
					},
				},
				action: 'Logout',
			},
			{
				name: 'Redirect Subscription Process',
				value: 'redirectSubscriptionProcess',
				description: 'Fetch redirection URL from KlickTipp API',
				routing: {
					request: {
						method: 'POST',
						url: '/list/redirect',
						body: {
							listid: '={{$parameter.listId}}',
							email: '={{$parameter.email}}',
						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Cookie': '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Fetch a list of redirection URL',
			},
			{
				name: 'Resend Autoresponder',
				value: 'resendAutoresponder',
				description: 'Resend an autoresponder to an email address',
				routing: {
					request: {
						method: 'POST',
						url: '/subscriber/resend',
						body: {
							autoresponder: '={{$parameter.autoresponderId}}',
							email: '={{$parameter.email}}',
						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Cookie': '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Resend an autoresponder to an email address',
			},
			{
				name: 'Search Subscriber',
				value: 'searchSubscriber',
				description: 'Search subscriber by email and return subscriber ID',
				routing: {
					request: {
						method: 'POST',
						url: '/subscriber/search',
						body: {
							email: '={{$parameter["email"]}}',
						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Search subscriber by email',
			},
			{
				name: 'Sign In',
				value: 'signIn',
				description: 'Subscribe an email using an API key',
				routing: {
					request: {
						method: 'POST',
						url: '/subscriber/signin',
						body: {
							apikey: '={{$env["KLICKTIPP_API_KEY"]}}',
							email: '={{$parameter["email"]}}',
							smsnumber: '={{$parameter["smsNumber"] || undefined}}',
							fields: '={{Object.keys($parameter["fields"]).length > 0 ? $parameter["fields"] : undefined}}',
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}'
								},
							},
						],
					},
				},
				action: 'Sign in',
			},
			{
				name: 'Sign Off',
				value: 'signOff',
				description: 'Unsubscribe an email using an API key',
				routing: {
					request: {
						method: 'POST',
						url: '/subscriber/signoff',
						body: {
							apikey: '={{$parameter["apiKey"]}}',
							email: '={{$parameter["email"]}}'
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}'
								},
							},
						],
					},
				},
				action: 'Sign off',
			},
			{
				name: 'Sign Out',
				value: 'signOut',
				description: 'Untag an email using an API key',
				routing: {
					request: {
						method: 'POST',
						url: '/subscriber/signout',
						body: {
							apikey: '={{$parameter["apiKey"]}}',
							email: '={{$parameter["email"]}}'
						},
						json: true,
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}'
								},
							},
						],
					},
				},
				action: 'Sign out',
			},
			{
				name: 'Subscribe',
				value: 'subscribe',
				description: 'Subscribe an email',
				routing: {
					request: {
						method: 'POST',
						url: '/subscriber',
						body: {
							email: '={{$parameter["email"]}}',
							smsnumber: '={{$parameter["smsNumber"] || undefined}}',
							listid: '={{$parameter["listId"] || undefined}}',
							tagid: '={{$parameter["tagId"] || undefined}}',
							fields: '={{Object.keys($parameter["fields"]).length > 0 ? $parameter["fields"] : undefined}}',
						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									payload: '={{$responseItem}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Subscribe an email',
			},
			{
				name: 'Tag Email',
				value: 'tagEmail',
				description: 'Add manual tags or SmartLinks to a contact',
				routing: {
					request: {
						method: 'POST',
						url: '/subscriber/tag',
						body: {
							email: '={{$parameter["email"]}}',
							tagids: '={{ $parameter["tagIds"]["tagIdValues"].map(tag => tag.tagId).join(",") }}',
						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						}
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									success: '={{!$responseItem.error}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					}
				},
				action: 'Add manual tags or smart links to a contact',
			},
			{
				name: 'Unsubscribe',
				value: 'unsubscribe',
				description: 'Unsubscribe an email',
				routing: {
					request: {
						method: 'POST',
						url: '/subscriber/unsubscribe',
						body: {
							email: '={{$parameter["email"]}}',
						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									success: '={{!$responseItem.error}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Unsubscribe',
			},
			{
				name: 'Untag Email',
				value: 'untagEmail',
				description: 'Untag an email',
				routing: {
					request: {
						method: 'POST',
						url: '/subscriber/untag',
						body: {
							email: '={{$parameter["email"]}}',
							tagid: '={{$parameter["tagId"]}}',
						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						}
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									success: '={{!$responseItem.error}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					}
				},
				action: 'Untag an email',
			},
			{
				name: 'Update Subscriber',
				value: 'updateSubscriber',
				description: 'Update a manual tag in KlickTipp',
				routing: {
					request: {
						method: 'PUT',
						url: '=/subscriber/{{$parameter["subscriberId"]}}',
						body: {
							newemail: '={{$parameter["email"] || undefined}}',
							newsmsnumber: '={{$parameter["smsNumber"] || undefined}}',
							fields: '={{Object.keys($parameter["fields"]).length > 0 ? $parameter["fields"] : undefined}}',
						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									success: '={{!$responseItem.error}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Update a subscriber by ID',
			},
			{
				name: 'Update Tag',
				value: 'updateTag',
				description: 'Update a manual tag in KlickTipp',
				routing: {
					request: {
						method: 'PUT',
						url: '=/tag/{{$parameter["tagId"]}}',
						body: {
							name: '={{$parameter["name"]}}',
							text: '={{$parameter["text"]}}',
						},
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'setKeyValue',
								properties: {
									success: '={{!$responseItem.error}}',
									klicktippSessionId: '={{$json["klicktippSessionId"]}}',
									klicktippSessionName: '={{$json["klicktippSessionName"]}}',
								},
							},
						],
					},
				},
				action: 'Update a tag by ID',
			},
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
	...getSubscriptionProcessRedirectionUrl,
	...signInFields,
	...signOffFields,
	...signOutFields,
	...autoresponderFields
];
