import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import {
	klickTippOperations,
	klickTippFields
} from './KlickTippDescription';

export class KlickTipp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'KlickTipp',
		name: 'klickTipp',
		icon: 'file:klicktipp.svg',
		group: ['transform'],
		version: 1,
		description: 'Interact with KlickTipp API',
		defaults: {
			name: 'KlickTipp',
		},
		inputs: ['main'],
		outputs: ['main'],
		requestDefaults: {
			baseURL: 'https://api.klick-tipp.com',
			///baseURL: 'https://webhook.site/1e710407-4bf9-4c01-8be7-4989b8f51774',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			...klickTippOperations,
			...klickTippFields
		],
	};
}
