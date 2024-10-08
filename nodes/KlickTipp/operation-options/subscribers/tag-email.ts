import { INodePropertyOptions } from 'n8n-workflow';

export const tagEmail: INodePropertyOptions = {
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
	action: 'Add manual tags or smart links to a contact',
};
