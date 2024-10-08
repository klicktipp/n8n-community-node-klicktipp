import { INodePropertyOptions } from 'n8n-workflow';

export const getSubscriptionProcess: INodePropertyOptions = {
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
};
