/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { NodeConnectionType, type INodeTypeDescription } from 'n8n-workflow';

import * as tag from './tag';
import * as optIn from './opt-in-process';
import * as subscriber from './subscriber';
import * as field from './field';
import * as contactTagging from './contact-tagging';

export const description: INodeTypeDescription = {
	displayName: 'KlickTipp',
	name: 'klicktipp',
	group: ['transform'],
	icon: { light: 'file:klicktipp.svg', dark: 'file:klicktipp.dark.svg' },
	version: 2,
	subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
	description: 'Interact with KlickTipp API',
	usableAsTool: true,
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
					name: 'Contact',
					value: 'subscriber',
				},
				{
					name: 'Contact Tagging',
					value: 'contact-tagging',
				},
				{
					name: 'Data Field',
					value: 'field',
				},
				{
					name: 'Opt-In Process',
					value: 'opt-in',
				},
				{
					name: 'Tag',
					value: 'tag',
				},
			],
		},
		...tag.description,
		...optIn.description,
		...subscriber.description,
		...field.description,
		...contactTagging.description,
	],
};
