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
