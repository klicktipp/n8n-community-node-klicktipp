import { INodePropertyOptions } from 'n8n-workflow';

export const unsubscribe: INodePropertyOptions = {
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
};
