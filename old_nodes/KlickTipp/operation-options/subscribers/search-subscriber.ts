import { INodePropertyOptions } from 'n8n-workflow';

export const searchSubscriber: INodePropertyOptions = {
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
};
