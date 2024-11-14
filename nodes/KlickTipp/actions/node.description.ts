/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { NodeConnectionType, type INodeTypeDescription } from 'n8n-workflow';

import * as tag from './tag';
import * as optIn from './opt-in-process';
import * as subscriber from './subscriber';
import * as field from './field';

export const description: INodeTypeDescription = {
	displayName: 'KlickTipp',
	name: 'klicktipp',
	group: ['transform'],
	icon: { light: 'file:klicktipp.svg', dark: 'file:klicktipp.dark.svg' },
	version: 2,
	subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
	description: 'Interact with KlickTipp API',
	defaults: {
		name: 'KlickTipp',
	},
	inputs: [NodeConnectionType.Main],
	// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
	outputs: [NodeConnectionType.Main],
	credentials: [
		{
			name: 'klickTippApi',
		},
	],
	properties: [
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			default: 'tag',
			options: [
				{
					name: 'Tag',
					value: 'tag',
				},
				{
					name: 'Opt-in Process',
					value: 'opt-in',
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
		...optIn.description,
		...subscriber.description,
		...field.description,
	],
};
