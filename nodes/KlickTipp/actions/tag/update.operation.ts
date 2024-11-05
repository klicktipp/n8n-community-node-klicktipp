import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {handleError, updateDisplayOptions} from '../../utils/utilities';
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
    description: 'Select the tag to update',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    placeholder: 'Enter name (optional)'
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
    operation: ['update'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const tagId = this.getNodeParameter('tagId', index) as string;
  const name = this.getNodeParameter('name', index) as string;
  const description = this.getNodeParameter('description', index) as string;

  if (!tagId) {
    return handleError.call(this, 'The tag ID is required.');
  }

  // Construct request body
  const body: IDataObject = {
    ...(name && { name }),
    ...(description && { text: description }),
  };

  try {
    await apiRequest.call(this, 'PUT', `/tag/${tagId}`, body);
    clearCache(['cachedTags']);

    return this.helpers.returnJsonArray({ success: true });
  } catch (error) {
    return handleError.call(this, error);
  }
}