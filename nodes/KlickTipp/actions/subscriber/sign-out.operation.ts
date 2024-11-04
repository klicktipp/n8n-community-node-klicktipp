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
  const apiKey = this.getNodeParameter('apiKey', index) as string;
  const email = this.getNodeParameter('email', index) as string;

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