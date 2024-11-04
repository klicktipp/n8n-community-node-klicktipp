/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { NodeConnectionType, type INodeTypeDescription } from 'n8n-workflow';

import * as tag from './tag';
import * as subscription from './subscription-process';
import * as subscriber from './subscriber';
import * as field from './field';

export const description: INodeTypeDescription = {
	displayName: 'KlickTipp',
	name: 'klicktipp',
	group: ['transform'],
	icon: 'file:klicktipp.svg',
	version: 2,
	description: 'Interact with KlickTipp API',
	defaults: {
		name: 'KlickTipp',
	},
	inputs: [NodeConnectionType.Main],
	outputs: [NodeConnectionType.Main],
	// @ts-ignore
	usableAsTool: true,
	credentials: [
		{
			name: 'klickTippApi',
			required: true,
		},
	],
	properties: [
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			default: 'message',
			options: [
				{
					name: 'Tag',
					value: 'tag',
				},
				{
					name: 'Opt-in process',
					value: 'subscription',
				},
				{
					name: 'Subscriber',
					value: 'subscriber',
				},
				{
					name: 'Field',
					value: 'field',
				},
			],
		},
		...tag.description,
		...subscription.description,
		...subscriber.description,
		...field.description
	],
};
