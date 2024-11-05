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
  }
];

const displayOptions = {
  show: {
    resource: ['opt-in'],
    operation: ['get'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const listId = this.getNodeParameter('listId', index) as string;

  if (!listId) {
    throw new Error('The opt-in process ID is required');
  }

  const responseData = await apiRequest.call(this, 'GET', `/list/${listId}`);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}