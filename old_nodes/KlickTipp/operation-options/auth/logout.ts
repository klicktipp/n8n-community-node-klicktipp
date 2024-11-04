import { INodePropertyOptions } from 'n8n-workflow';

export const logout: INodePropertyOptions = {
	name: 'Logout',
	value: 'logout',
	description: 'Logs out from the KlickTipp API',
	routing: {
		request: {
			method: 'POST',
			url: '/account/logout',
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
						// Reset session variables
						klicktippSessionId: '',
						klicktippSessionName: '',
					},
				},
			],
		},
	},
	action: 'Logout',
};
