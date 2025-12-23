import type { IExecuteFunctions, INodeProperties, NodeApiError } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {
	handleArrayResponse,
	handleError,
	objectToIdValueArray,
	updateDisplayOptions,
} from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Subscription Status',
		name: 'subscriptionStatus',
		type: 'multiOptions',
		options: [
			{ name: 'Pending', value: 'pending' },
			{ name: 'Subscribed', value: 'subscribed' },
			{ name: 'Unsubscribed', value: 'unsubscribed' },
		],
		default: [],
		required: false,
		description: 'Filter contacts by their subscription status. You can select one or multiple values to narrow down the results. If no value is selected, the filter defaults to Subscribed, meaning only contacts with an active subscription are included.',
	},
	{
		displayName: 'Bounce Status',
		name: 'bounceStatus',
		type: 'multiOptions',
		options: [
			{ name: 'Hard bounce', value: 'hardbounce' },
			{ name: 'Soft bounce', value: 'softbounce' },
			{ name: 'Spam bounce', value: 'spambounce' },
			{ name: 'No bounce', value: 'nobounce' },
		],
		default: [],
		required: false,
		description: 'Filter contacts by their bounce status. You can select one or multiple values. If no value is selected, the filter defaults to Soft Bounce, Spam Bounce, and No Bounce.',
	},
];

const displayOptions = {
	show: {
		resource: ['subscriber'],
		operation: ['index'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	try {
		const subscriptionStatus = this.getNodeParameter('subscriptionStatus', index, []) as string[];
		const bounceStatus = this.getNodeParameter('bounceStatus', index, []) as string[];

		const uniq = (arr: string[]) => [...new Set((arr || []).filter(Boolean))];

		const statusCsv = uniq(subscriptionStatus).join(',');
		const bounceCsv = uniq(bounceStatus).join(',');

		const query: Record<string, string> = {};
		if (statusCsv) query.status = statusCsv;
		if (bounceCsv) query.bounceStatus = bounceCsv;

		const responseData = await apiRequest.call(
			this,
			'GET',
			`subscriber`,
			{},
			query
		);

		const formattedData = objectToIdValueArray(responseData);

		return handleArrayResponse.call(this, formattedData, index);
	} catch (error) {
		return handleError.call(this, error as NodeApiError);
	}
}
