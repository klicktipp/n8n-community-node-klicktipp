import type { IDataObject, IExecuteFunctions, INodeProperties, NodeApiError } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {
	handleArrayResponse,
	handleError,
	objectToIdValueArray,
	updateDisplayOptions,
} from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Tag',
		name: 'tagId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTags',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
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
		operation: ['tagged'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const tagId = this.getNodeParameter('tagId', index) as number;

	if (!tagId) {
		return handleError.call(this, 'Tag ID is missing');
	}

	const subscriptionStatus = this.getNodeParameter('subscriptionStatus', index, []) as string[];
	const bounceStatus = this.getNodeParameter('bounceStatus', index, []) as string[];

  const uniq = (arr: string[]) => [...new Set((arr || []).filter(Boolean))];

  const statusCsv = uniq(subscriptionStatus).join(',');
  const bounceCsv = uniq(bounceStatus).join(',');

	const query: Record<string, string> = {};
	if (statusCsv) query.status = statusCsv;
	if (bounceCsv) query.bounceStatus = bounceCsv;

	try {
		const responseData = await apiRequest.call(
			this,
			'POST',
			'subscriber/tagged',
			{ tagid: tagId },
			query,
		);

		const transformedData = objectToIdValueArray(responseData);

		const formattedData = transformedData.map(({ id, value }) => ({
			id: id as string,
			timestamp: value as string,
		})) as IDataObject[];

		return handleArrayResponse.call(this, formattedData, index);
	} catch (error) {
		return handleError.call(this, error as NodeApiError);
	}
}
