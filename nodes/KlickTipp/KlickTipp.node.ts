import type {
	IExecuteFunctions,
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
} from 'n8n-workflow';

import { loadOptions } from './methods';
import { description } from './actions/node.description';
import { router } from './actions/router';

export class KlickTipp implements INodeType {
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
