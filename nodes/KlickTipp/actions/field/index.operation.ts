import type { IDataObject, IExecuteFunctions, INodeProperties, NodeApiError } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {
	handleArrayResponse,
	handleError,
	objectToIdValueArray,
	updateDisplayOptions,
} from '../../utils/utilities';
export const properties: INodeProperties[] = [];

const displayOptions = {
	show: {
		resource: ['field'],
		operation: ['index'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	try {
		const responseData = await apiRequest.call(this, 'GET', `/field`);

		const transformedData: IDataObject[] = objectToIdValueArray(responseData);

		return handleArrayResponse.call(this, transformedData, index);
	} catch (error) {
		return handleError.call(this, error as NodeApiError);
	}
}
