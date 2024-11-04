import { INodePropertyOptions } from 'n8n-workflow';

export const signOff: INodePropertyOptions = {
	name: 'Sign Off',
	value: 'signOff',
	description: 'Unsubscribe an email using an API key',
	routing: {
		request: {
			method: 'POST',
			url: '/subscriber/signoff',
			body: {
				apikey: '={{$parameter["apiKey"]}}',
				email: '={{$parameter["email"]}}',
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
			],
		},
	},
	action: 'Sign off',
};
