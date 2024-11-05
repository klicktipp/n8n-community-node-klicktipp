import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {transformDataFields, updateDisplayOptions} from '../../utils/utilities';

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
    operation: ['signIn'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const credentials = await this.getCredentials('klickTippApi');
  if (!credentials) {
    throw new Error('Missing credentials. Please check that your KlickTipp API credentials are configured correctly.');
  }

  // Retrieve required parameters from the node
  const email = this.getNodeParameter('email', index) as string;
  const smsNumber = this.getNodeParameter('smsNumber', index) as string;
  const fields = this.getNodeParameter('fields', index) as IDataObject;
  const apiKey = credentials.apiKey as string;

  if (!email) {
    throw new Error('The email address is required.');
  }

  if (!apiKey) {
    throw new Error('The API key is required.');
  }

  // Prepare the request body
  const body: IDataObject = {
    email,
    apikey: apiKey,
    ...(smsNumber && { smsNumber }),
  };

  // Process data fields if available
  if (fields?.dataFields) {
    body.fields = transformDataFields(fields.dataFields as IDataObject[]);
  }

  const responseData = await apiRequest.call(this, 'POST', '/subscriber/signin', body);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}