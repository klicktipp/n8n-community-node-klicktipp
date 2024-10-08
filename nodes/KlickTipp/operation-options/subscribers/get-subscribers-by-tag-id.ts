import { INodePropertyOptions } from 'n8n-workflow';

export const getSubscribersByTagId: INodePropertyOptions = {
	name: 'Fetch subscribers by tag ID',
	value: 'getSubscribersByTagId',
	description: 'Get all active subscribers tagged with the given tag ID',
	routing: {
		request: {
			method: 'POST',
			url: '/subscriber/tagged',
			headers: {
				Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
			},
			body: {
				tagid: '={{ $parameter["tagId"] }}',
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
	action: 'Get all active subscribers tagged with the given tag ID',
};
