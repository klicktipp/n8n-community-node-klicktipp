import { INodePropertyOptions } from 'n8n-workflow';

export const getSubscriptionProcessRedirectionUrl: INodePropertyOptions = {
	name: 'Get subscription process redirection URL',
	value: 'getSubscriptionProcessRedirectionURL',
	description: 'Get subscription process (list) redirection URL for given subscription',
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
	action: 'Fetch a list of redirection URL',
};
