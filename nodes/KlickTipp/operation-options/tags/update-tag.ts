import { INodePropertyOptions } from 'n8n-workflow';

export const updateTag: INodePropertyOptions = {
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
};
