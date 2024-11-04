import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';

import type { KlickTippType } from './node.type';

import * as subscriptionProcess from './subscription-process';
import * as tag from './tag';
import * as subscriber from './subscriber';
import * as field from './field';

export async function router(this: IExecuteFunctions) {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];

	const resource = this.getNodeParameter<KlickTippType>('resource', 0) as string;
	const operation = this.getNodeParameter('operation', 0);

	let responseData;

	const KlickTipp = {
		resource,
		operation,
	} as KlickTippType;

	for (let i = 0; i < items.length; i++) {
		try {
			switch (KlickTipp.resource) {
				case 'subscription':
					responseData = await subscriptionProcess[KlickTipp.operation].execute.call(this, i);
					break;
				case 'tag':
					responseData = await tag[KlickTipp.operation].execute.call(this, i);
					break;
				case 'subscriber':
					responseData = await subscriber[KlickTipp.operation].execute.call(this, i);
					break;
				case 'field':
					responseData = await field[KlickTipp.operation].execute.call(this, i);
					break;
				default:
					throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not known`);
			}

			returnData.push(...responseData);
		} catch (error) {
			if (this.continueOnFail()) {
				const executionErrorData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray({ error: error.message }),
					{ itemData: { item: i } },
				);
				returnData.push(...executionErrorData);
				continue;
			}
			//NodeApiError will be missing the itemIndex, add it
			if (error instanceof NodeApiError && error?.context?.itemIndex === undefined) {
				if (error.context === undefined) {
					error.context = {};
				}
				error.context.itemIndex = i;
			}
			throw error;
		}
	}
	return [returnData];
}