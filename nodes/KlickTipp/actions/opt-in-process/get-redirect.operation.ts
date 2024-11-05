import type {
  IDataObject,
  IExecuteFunctions,
  INodeProperties
} from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
  {
    displayName: 'Opt-in process',
    name: 'listId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getOptInProcesses'
    },
    default: '',
    required: true,
    description: 'Select the the ID of a opt-in process to retrieve',
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    required: true,
    description: 'Email address',
  },
];

const displayOptions = {
  show: {
    resource: ['opt-in'],
    operation: ['getRedirect'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const listId = this.getNodeParameter('listId', index) as string;
  const email = this.getNodeParameter('email', index) as string;

  if (!listId) {
    throw new Error('The opt-in process ID is required');
  }

  if (!email) {
    throw new Error('The email address is required.');
  }

  const body: IDataObject = {
    listid: listId,
    email,
  };

  const responseData = await apiRequest.call(this, 'POST', '/list/redirect', body);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}