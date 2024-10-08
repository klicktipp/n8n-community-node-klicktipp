import { INodeProperties } from 'n8n-workflow';

export const subscriberCustomFields: INodeProperties[] = [
	{
		displayName: 'Birthday (Timestamp)',
		name: 'fieldBirthday',
		type: 'number',
		default: '',
		description: 'The subscriber\'s birthday, represented as a Unix timestamp',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'City',
		name: 'fieldCity',
		type: 'string',
		default: '',
		description: 'The city part of the subscriber\'s address',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'Company Name',
		name: 'fieldCompanyName',
		type: 'string',
		default: '',
		description: 'The name of the subscriber\'s company, if applicable',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'Country',
		name: 'fieldCountry',
		type: 'string',
		default: '',
		description: 'The country part of the subscriber\'s address',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'Fax Number',
		name: 'fieldFax',
		type: 'string',
		default: '',
		description: 'The subscriber\'s fax number',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'First Name',
		name: 'fieldFirstName',
		type: 'string',
		default: '',
		description: 'The subscriber\'s first name',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'fieldLastName',
		type: 'string',
		default: '',
		description: 'The subscriber\'s last name',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'Lead Value (Number)',
		name: 'fieldLeadValue',
		type: 'number',
		default: '',
		description: 'The value assigned to this lead, useful for ranking or prioritizing leads',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'Mobile Phone Number',
		name: 'fieldMobilePhone',
		type: 'string',
		default: '',
		description: 'The subscriber\'s mobile phone number',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'Phone Number',
		name: 'fieldPhone',
		type: 'string',
		default: '',
		description: 'The subscriber\'s primary phone number',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'Private Phone Number',
		name: 'fieldPrivatePhone',
		type: 'string',
		default: '',
		description: 'The subscriber\'s private phone number',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'State/Province',
		name: 'fieldState',
		type: 'string',
		default: '',
		description: 'The state or province part of the subscriber\'s address',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'Street Address Line 1',
		name: 'fieldStreet1',
		type: 'string',
		default: '',
		description: 'The primary street address line (e.g., street number and street name)',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'Street Address Line 2',
		name: 'fieldStreet2',
		type: 'string',
		default: '',
		description: 'The secondary street address line (e.g., apartment, suite, or unit number)',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'Website URL',
		name: 'fieldWebsite',
		type: 'string',
		default: '',
		description: 'The URL of the subscriber\'s website, if applicable',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
	{
		displayName: 'ZIP/Postal Code',
		name: 'fieldZip',
		type: 'string',
		default: '',
		description: 'The ZIP or postal code part of the subscriber\'s address',
		displayOptions: {
			show: {
				operation: ['subscribe', 'updateSubscriber', 'signIn'],
			},
		},
	},
];