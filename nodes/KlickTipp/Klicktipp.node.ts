import type {
	IExecuteFunctions,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
} from 'n8n-workflow';
import * as n8nWorkflow from 'n8n-workflow';

import * as contactTagging from './actions/contact-tagging';
import * as field from './actions/field';
import * as optIn from './actions/opt-in-process';
import * as subscriber from './actions/subscriber';
import * as tag from './actions/tag';
import { loadOptions } from './methods';
import { router } from './actions/router';

const NodeConnectionTypes =
	n8nWorkflow.NodeConnectionTypes ??
	({
		Main: (n8nWorkflow as unknown as { NodeConnectionType: { Main: string } }).NodeConnectionType
			.Main,
	} as const);

const description: INodeTypeDescription = {
	displayName: 'KlickTipp',
	name: 'klicktipp',
	group: ['transform'],
	icon: { light: 'file:klicktipp.svg', dark: 'file:klicktipp.dark.svg' },
	version: [1, 2, 3],
	subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
	description: 'Interact with KlickTipp API',
	usableAsTool: true,
	defaults: {
		name: 'KlickTipp',
	},
	inputs: [NodeConnectionTypes.Main],
	outputs: [NodeConnectionTypes.Main],
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
				{ name: 'Contact', value: 'subscriber' },
				{ name: 'Contact Tagging', value: 'contact-tagging' },
				{ name: 'Data Field', value: 'field' },
				{ name: 'Opt-In Process', value: 'opt-in' },
				{ name: 'Tag', value: 'tag' },
			],
		},
		...tag.description,
		...optIn.description,
		...subscriber.description,
		...field.description,
		...contactTagging.description,
	],
};

export class Klicktipp implements INodeType {
	description: INodeTypeDescription = {
		...description,
		icon: { light: 'file:klicktipp.svg', dark: 'file:klicktipp.dark.svg' },
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		usableAsTool: true,
	};

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			...description,
		};
	}

	methods = { loadOptions };

	async execute(this: IExecuteFunctions) {
		return await router.call(this);
	}
}
