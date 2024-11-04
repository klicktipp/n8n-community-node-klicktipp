import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
  {
    displayName: 'Subscriber ID',
    name: 'subscriberId',
    type: 'string',
    default: '',
    required: true,
    description: 'The subscriber\'s ID',
  }
];

const displayOptions = {
  show: {
    resource: ['subscriber'],
    operation: ['delete'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const subscriberId = this.getNodeParameter('subscriberId', index) as string;

  const responseData = await apiRequest.call(this, 'DELETE', `/subscriber/${subscriberId}`);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}