import { INodeTypeDescription } from 'n8n-workflow';

export const KlickTippDescription: INodeTypeDescription = {
	displayName: 'KlickTipp API',
	name: 'klickTippApi',
	group: ['transform'],
	version: 1,
	description: 'Interact with the KlickTipp API',
	defaults: {
		name: 'KlickTipp API Node',
	},
	inputs: ['main'],
	outputs: ['main'],
	properties: [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			placeholder: 'Your KlickTipp username',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			placeholder: 'Your KlickTipp password',
			required: true,
		},
		{
			displayName: 'API Operation',
			name: 'operation',
			type: 'options',
			options: [
				{
					name: 'Subscribe User',
					value: 'subscribeUser',
				},
				{
					name: 'Tag User',
					value: 'tagUser',
				},
				{
					name: 'Unsubscribe User',
					value: 'unsubscribeUser',
				},
			],
			default: 'subscribeUser',
		},
		{
			displayName: 'Email',
			name: 'email',
			type: 'string',
			default: '',
			required: true,
			displayOptions: {
				show: {
					operation: ['subscribeUser', 'tagUser', 'unsubscribeUser'],
				},
			},
		},
		{
			displayName: 'Tag ID',
			name: 'tagId',
			type: 'number',
			default: 0,
			displayOptions: {
				show: {
					operation: ['tagUser'],
				},
			},
		},
	],
};
