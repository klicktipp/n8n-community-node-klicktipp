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
      loadOptionsMethod: 'getTags',
      multipleValues: true
    },
    default: '',
    description: 'Select the tag (Required)',
  },
];

const displayOptions = {
  show: {
    resource: ['subscriber'],
    operation: ['tagged'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const tagId = this.getNodeParameter('tagId', index) as number;

  if (!tagId) {
    throw new Error('The tag ID is required.');
  }

  const body = { tagid: tagId }

  const responseData = await apiRequest.call(this, 'GET', '/subscriber/tagged', body);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}