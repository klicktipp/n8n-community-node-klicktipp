import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class KlickTipp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'KlickTipp API',
		name: 'klickTippApi',
		group: ['transform'],
		version: 1,
		description: 'Interact with the KlickTipp API',
		defaults: {
			name: 'KlickTipp API Node',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [],
	};

	// async execute(this: IExecuteFunctions) {
	// 	const operation = this.getNodeParameter('operation', 0) as string;
	// 	const email = this.getNodeParameter('email', 0) as string;
	//
	// 	// Your logic to handle the execution based on selected operation
	// }
}
