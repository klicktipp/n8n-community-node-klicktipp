import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {
	handleArrayResponse,
	handleError,
	objectToIdValueArray,
	updateDisplayOptions,
} from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		// eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
		displayName: 'Tag',
		name: 'tagId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTags',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	},
];

const displayOptions = {
	show: {
		resource: ['subscriber'],
		operation: ['tagged'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const tagId = this.getNodeParameter('tagId', index) as number;

	if (!tagId) {
		return handleError.call(this, 'Tag ID is missing');
	}

	try {
		const responseData = await apiRequest.call(this, 'POST', '/subscriber/tagged', {
			tagid: tagId,
		});

		const transformedData = objectToIdValueArray(responseData);

		const formattedData = transformedData.map(({ id, value }) => ({
			id: id as string,
			timestamp: value as string,
		})) as IDataObject[];

		return handleArrayResponse.call(this, formattedData, index);
	} catch (error) {
		return handleError.call(this, error);
	}
}
