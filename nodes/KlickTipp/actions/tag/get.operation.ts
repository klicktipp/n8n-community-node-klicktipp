import type {
  IDataObject,
  IExecuteFunctions,
  INodeProperties
} from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
  {
    displayName: 'Tag ID',
    name: 'tagId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getTags'
    },
    required: true,
    default: '',
    options: [],
    description: 'Select the tag to retrieve',
  }
];

const displayOptions = {
  show: {
    resource: ['tag'],
    operation: ['get'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const tagId = this.getNodeParameter('tagId', index) as string;

  if (!tagId) {
    throw new Error('Tag ID is required.');
  }

  const responseData = await apiRequest.call(this, 'GET', `/tag/${tagId}`);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}