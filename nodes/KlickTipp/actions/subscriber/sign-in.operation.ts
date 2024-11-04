import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
  {
    displayName: 'API Key',
    name: 'apiKey',
    type: 'credentialsSelect',
    default: '',
    required: true,
    placeholder: 'Enter your API key (required)'
  },
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
  const apiKey = this.getNodeParameter('apiKey', index) as string;
  const email = this.getNodeParameter('email', index) as string;
  const smsNumber = this.getNodeParameter('smsNumber', index) as string;
  const fields = this.getNodeParameter('fields', index) as IDataObject;

  const dataFields = fields.dataFields as IDataObject[];

  // Explicitly type `acc` as `IDataObject` to avoid index type errors
  const result = dataFields.reduce((acc: IDataObject, field) => {
    // Check if `fieldId` exists and is a string, to avoid TypeScript index type errors
    if (field.fieldId && typeof field.fieldId === 'string') {
      acc[field.fieldId] = field.fieldValue;
    }
    return acc;
  }, {} as IDataObject);

  const body: IDataObject = {
    email,
    apikey: apiKey
  };

  if (smsNumber) {
    body.smsNumber = smsNumber;
  }

  if (fields) {
    body.fields = result;
  }

  console.log({body});
  const responseData = await apiRequest.call(this, 'POST', '/subscriber/signin', body);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}