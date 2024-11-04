import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
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
    default: '',
    required: true,
    description: 'Select the tag to update',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    placeholder: 'Enter name (optional)'
  },
  {
    displayName: 'Description',
    name: 'description',
    type: 'string',
    default: '',
    placeholder: 'Enter description (optional)'
  },
];

const displayOptions = {
  show: {
    resource: ['tag'],
    operation: ['update'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const tagId = this.getNodeParameter('tagId', index) as string;
  const name = this.getNodeParameter('name', index) as string;
  const description = this.getNodeParameter('description', index) as string;

  const body: IDataObject = {
    name,
  };

  if (description) {
    body.text = description;
  }

  const responseData = await apiRequest.call(this, 'PUT', `/tag/${tagId}`, body);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}