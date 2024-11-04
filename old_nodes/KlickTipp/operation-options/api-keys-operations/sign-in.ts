import { INodePropertyOptions } from 'n8n-workflow';

export const signIn: INodePropertyOptions = {
	name: 'Sign In',
	value: 'signIn',
	description: 'Subscribe an email using an API key',
	routing: {
		request: {
			method: 'POST',
			url: '/subscriber/signin',
			body: {
				// are the correct parameters being passed => api_key and email_address is from the docs
				apikey: '={{$parameter["apiKey"]}}',
				email: '={{$parameter["email"]}}',
				smsnumber: '={{$parameter["smsNumber"] || undefined}}',
				fields: {
					fieldBirthday: '={{$parameter["fieldBirthday"] || undefined}}',
					fieldCity: '={{$parameter["fieldCity"] || undefined}}',
					fieldCompanyName: '={{$parameter["fieldCompanyName"] || undefined}}',
					fieldCountry: '={{$parameter["fieldCountry"] || undefined}}',
					fieldFax: '={{$parameter["fieldFax"] || undefined}}',
					fieldFirstName: '={{$parameter["fieldFirstName"] || undefined}}',
					fieldLastName: '={{$parameter["fieldLastName"] || undefined}}',
					fieldLeadValue: '={{$parameter["fieldLeadValue"] || undefined}}',
					fieldMobilePhone: '={{$parameter["fieldMobilePhone"] || undefined}}',
					fieldPhone: '={{$parameter["fieldPhone"] || undefined}}',
					fieldPrivatePhone: '={{$parameter["fieldPrivatePhone"] || undefined}}',
					fieldState: '={{$parameter["fieldState"] || undefined}}',
					fieldStreet1: '={{$parameter["fieldStreet1"] || undefined}}',
					fieldStreet2: '={{$parameter["fieldStreet2"] || undefined}}',
					fieldWebsite: '={{$parameter["fieldWebsite"] || undefined}}',
					fieldZip: '={{$parameter["fieldZip"] || undefined}}',
				},
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
	action: 'Sign in',
};
