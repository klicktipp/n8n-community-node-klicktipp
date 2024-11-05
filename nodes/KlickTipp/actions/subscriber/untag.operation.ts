import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {handleError, handleResponse, updateDisplayOptions} from '../../utils/utilities';

export const properties: INodeProperties[] = [
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    required: true,
    placeholder: 'Enter email address (required)'
  },
  {
    displayName: 'Tag ID',
    name: 'tagId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getTags'
    },
    default: '',
    description: 'Select the tag (optional)',
    required: true
  },
];

const displayOptions = {
  show: {
    resource: ['subscriber'],
    operation: ['untag'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const email = this.getNodeParameter('email', index) as string;
  const tagId = this.getNodeParameter('tagId', index) as number;

  if (!email) {
    return handleError.call(this, 'The email address is required.');
  }

  if (!tagId) {
    return handleError.call(this, 'The tag ID is required.');
  }

  const body: IDataObject = {
    email,
    tagid: tagId
  };

  try {
    const responseData = await apiRequest.call(this, 'POST', '/subscriber/untag', body);
    return handleResponse.call(this, responseData, index);
  } catch (error) {
    return handleError.call(this, error);
  }
}