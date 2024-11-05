import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { updateDisplayOptions } from '../../utils/utilities';
import {clearCache} from "../../utils/utilities";

export const properties: INodeProperties[] = [
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    placeholder: 'Enter name (required)'
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: '',
    placeholder: 'Enter description (optional)'
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
    throw new Error('The tag name is required.');
  }

  // Construct request body
  const body: IDataObject = {
    name,
    ...(description && { text: description }),
  };

  try {
    const responseData = await apiRequest.call(this, 'POST', '/tag', body);

    clearCache(['cachedTags']);

    const executionData = this.helpers.constructExecutionMetaData(
      this.helpers.returnJsonArray(responseData as IDataObject),
      { itemData: { item: index } },
    );

    return executionData;
  } catch (error) {
    return this.helpers.returnJsonArray({ success: false, error: error.message || 'Undefined error' });
  }
}