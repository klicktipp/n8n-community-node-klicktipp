import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { updateDisplayOptions } from '../../utils/utilities';
import {clearCache} from "../../utils/utilities";

export const properties: INodeProperties[] = [
  {
    displayName: 'Tag ID',
    name: 'tagId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getTags'
    },
    default: '',
    required: true,
    description: 'Select the tag to delete',
  }
];

const displayOptions = {
  show: {
    resource: ['tag'],
    operation: ['delete'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const tagId = this.getNodeParameter('tagId', index) as string;

  if (!tagId) {
    throw new Error('The tag ID is required.');
  }

  try {
    await apiRequest.call(this, 'DELETE', `/tag/${tagId}`);
    clearCache(['cachedTags']);

    return this.helpers.returnJsonArray({ success: true });
  } catch (error) {
    return this.helpers.returnJsonArray({ success: false, error: error.message || 'Undefined error' });
  }
}