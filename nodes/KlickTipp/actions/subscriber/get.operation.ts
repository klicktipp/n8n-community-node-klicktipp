import type {
  IDataObject,
  IExecuteFunctions,
  INodeProperties
} from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
  {
    displayName: 'Subscriber ID',
    name: 'subscriberId',
    type: 'string',
    required: true,
    default: '',
    description: 'Select the subscriber to retrieve',
  }
];

const displayOptions = {
  show: {
    resource: ['subscriber'],
    operation: ['get'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const subscriberId = this.getNodeParameter('subscriberId', index) as string;

  if (!subscriberId) {
    throw new Error('Tag ID is required.');
  }

  const responseData = await apiRequest.call(this, 'GET', `/subscriber/${subscriberId}`);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}