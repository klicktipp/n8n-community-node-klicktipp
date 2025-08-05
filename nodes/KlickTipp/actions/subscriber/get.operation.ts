import type { IExecuteFunctions, INodeProperties, NodeApiError } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {
	handleError,
	handleObjectResponse,
	updateDisplayOptions,
	resolveSubscriberId,
} from '../../utils/utilities';

export const properties: INodeProperties[] = [
	/* ---------- v1  (ID only) ---------------------------------- */
	{
		displayName: 'Contact ID',
		name: 'subscriberId',
		type: 'string',
		default: '',
		placeholder: 'Enter contact ID (required)',
		description: 'ID of the contact to retrieve',
		displayOptions: { show: { '@version': [1] } },
	},

	/* ---------- v2  selector, default = ID --------------------- */
	{
		displayName: 'Identify Contact By',
		name: 'identifierType',
		type: 'options',
		options: [
			{ name: 'Contact ID', value: 'id' },
			{ name: 'Email Address', value: 'email' },
		],
		default: 'id',
		displayOptions: { show: { '@version': [2] } },
	},

	/* duplicate selector for v3 – default = Email --------------- */
	{
		displayName: 'Identify Contact By',
		name: 'identifierType',
		type: 'options',
		options: [
			{ name: 'Contact ID', value: 'id' },
			{ name: 'Email Address', value: 'email' },
		],
		default: 'email',
		displayOptions: { show: { '@version': [3] } },
	},

	/* ID field for v2 + v3 (shown only when “ID” is chosen) ------ */
	{
		displayName: 'Contact ID',
		name: 'subscriberId',
		type: 'string',
		default: '',
		description: 'Enter the ID of the contact you want to retrieve',
		placeholder: 'Enter contact ID (required)',
		displayOptions: {
			show: { '@version': [2, 3], identifierType: ['id'] },
		},
	},

	/* Email field for v2 + v3 ----------------------------------- */
	{
		displayName: 'Email Address',
		name: 'lookupEmail',
		type: 'string',
		default: '',
		placeholder: 'Enter email address (required)',
		displayOptions: {
			show: { '@version': [2, 3], identifierType: ['email'] },
		},
	},
];

const displayOptions = {
	show: {
		resource: ['subscriber'],
		operation: ['get'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	try {
		const subscriberId = await resolveSubscriberId.call(this, index);

		const responseData = await apiRequest.call(this, 'GET', `/subscriber/${subscriberId}`);
		return handleObjectResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error as NodeApiError);
	}
}
