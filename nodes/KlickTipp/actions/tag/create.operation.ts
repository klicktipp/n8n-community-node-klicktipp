import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, handleObjectResponse, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		placeholder: 'Enter name (required)',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		placeholder: 'Enter description',
	},
];

const displayOptions = {
	show: {
		resource: ['tag'],
		operation: ['create'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const name = this.getNodeParameter('name', index) as string;
	const description = this.getNodeParameter('description', index) as string;

	if (!name) {
		return handleError.call(this, 'Tag name is missing');
	}

	// Construct request body
	const body: IDataObject = {
		name,
		...(description && { text: description }),
	};

	try {
		const responseData = await apiRequest.call(this, 'POST', '/tag', body);

		const enhancedData = {
			id: responseData[0],
		};

		return handleObjectResponse.call(this, enhancedData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
