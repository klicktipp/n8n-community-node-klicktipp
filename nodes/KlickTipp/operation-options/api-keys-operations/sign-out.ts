import { INodePropertyOptions } from 'n8n-workflow';

export const signOut: INodePropertyOptions = {
	name: 'Sign Out',
	value: 'signOut',
	description: 'Untag an email using an API key',
	routing: {
		request: {
			method: 'POST',
			url: '/subscriber/signout',
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
	action: 'Sign out',
};
