import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, handleResponse, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [];

const displayOptions = {
	show: {
		resource: ['tag'],
		operation: ['index'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	try {
		const responseData = await apiRequest.call(this, 'GET', `/tag`);
		return handleResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
