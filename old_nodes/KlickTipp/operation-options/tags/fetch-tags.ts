import { INodePropertyOptions } from 'n8n-workflow';

export const fetchTags: INodePropertyOptions = {
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
};
