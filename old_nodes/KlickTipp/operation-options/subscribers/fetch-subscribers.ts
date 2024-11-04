import { INodePropertyOptions } from 'n8n-workflow';

export const fetchSubscribers: INodePropertyOptions = {
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
};
