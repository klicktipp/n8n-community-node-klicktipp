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
  }
];

const displayOptions = {
  show: {
    resource: ['subscriber'],
    operation: ['signOut'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const credentials = await this.getCredentials('klickTippApi');
  if (!credentials) {
    throw new Error('Missing credentials. Please check that your KlickTipp API credentials are configured correctly.');
  }
  const apiKey = credentials.apiKey as string;

  const email = this.getNodeParameter('email', index) as string;
  if (!email) {
    throw new Error('The email address is required.');
  }

  const body: IDataObject = {
    email,
    apikey: apiKey
  };

  const responseData = await apiRequest.call(this, 'POST', '/subscriber/signout', body);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}