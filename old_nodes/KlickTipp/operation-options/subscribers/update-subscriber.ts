import { INodePropertyOptions } from 'n8n-workflow';

export const updateSubscriber: INodePropertyOptions = {
	name: 'Update Subscriber',
	value: 'updateSubscriber',
	description: 'Update the subscriber by ID',
	routing: {
		request: {
			method: 'PUT',
			url: '=/subscriber/{{$parameter["subscriberId"]}}',
			body: {
				newemail: '={{$parameter["email"] || undefined}}',
				newsmsnumber: '={{$parameter["smsNumber"] || undefined}}',
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
	action: 'Update a subscriber by ID',
};
