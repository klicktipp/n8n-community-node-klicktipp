import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { updateDisplayOptions } from '../../utils/utilities';

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
      loadOptionsMethod: 'getSubscriptionProcesses'
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
  };

  if (listId) {
    body.listId = listId;
  }

  if (tagId) {
    body.tagId = tagId;
  }

  if (smsNumber) {
    body.smsnumber = smsNumber;
  }

  if (fields) {
    body.fields = result;
  }

  const responseData = await apiRequest.call(this, 'POST', '/subscriber', body);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}