import { INodePropertyOptions } from 'n8n-workflow';

export const deleteSubscriber: INodePropertyOptions = {
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
};
