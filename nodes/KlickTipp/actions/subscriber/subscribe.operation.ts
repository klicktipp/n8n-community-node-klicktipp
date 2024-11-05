import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {handleError, handleResponse, transformDataFields, updateDisplayOptions} from '../../utils/utilities';

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
    displayName: 'SMS number',
    name: 'smsNumber',
    type: 'string',
    default: '',
    placeholder: 'Enter SMS number (optional)'
  },
  {
    displayName: 'Opt-in process',
    name: 'listId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getOptInProcesses'
    },
    description: 'Select the the ID of a opt-in process (optional)',
    default: ''
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
  },
  {
    displayName: 'Data fields',
    name: 'fields',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true
    },
    default: {},
    description: 'Select the data field (optional)',
    options: [
      {
        name: 'dataFields',
        displayName: 'Data Field',
        values: [
          {
            displayName: 'Field Name',
            name: 'fieldId',
            type: 'options',
            typeOptions: {
              loadOptionsMethod: 'getFields',
            },
            default: '',
            description: 'Select the data field',
          },
          {
            displayName: 'Field Value',
            name: 'fieldValue',
            type: 'string',
            default: '',
            description: 'Enter the value for the selected field',
          },
        ],
      },
    ],
  }
];

const displayOptions = {
  show: {
    resource: ['subscriber'],
    operation: ['subscribe'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const email = this.getNodeParameter('email', index) as string;
  const listId = this.getNodeParameter('listId', index) as number;
  const tagId = this.getNodeParameter('tagId', index) as number;
  const smsNumber = this.getNodeParameter('smsNumber', index) as string;
  const fields = this.getNodeParameter('fields', index) as IDataObject;

  if (!email) {
    return handleError.call(this, 'The email address is required.');
  }

  // Construct request body
  const body: IDataObject = {
    email,
    ...(listId && { listid: listId }),
    ...(tagId && { tagid: tagId }),
    ...(smsNumber && { smsnumber: smsNumber }),
    ...(fields?.dataFields && { fields: transformDataFields(fields.dataFields as IDataObject[]) }),
  };

  try {
    const responseData = await apiRequest.call(this, 'POST', '/subscriber', body);
    return handleResponse.call(this, responseData, index);
  } catch (error) {
    return handleError.call(this, error);
  }
}