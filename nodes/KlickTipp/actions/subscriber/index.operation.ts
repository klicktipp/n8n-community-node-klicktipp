import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
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
		resource: ['subscriber'],
		operation: ['index'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	try {
		const responseData = await apiRequest.call(this, 'GET', `/subscriber`);

		const formattedData = objectToIdValueArray(responseData);

		return handleArrayResponse.call(this, formattedData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
