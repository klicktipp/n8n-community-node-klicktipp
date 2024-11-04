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
    displayName: 'Tag ID',
    name: 'tagId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getTags',
      multipleValues: true
    },
    default: '',
    description: 'Select the tag (optional)',
  },
];

const displayOptions = {
  show: {
    resource: ['subscriber'],
    operation: ['tag'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const email = this.getNodeParameter('email', index) as string;
  const tagId = this.getNodeParameter('tagId', index) as number;

  const body: IDataObject = {
    email,
    tagids: tagId
  };

  const responseData = await apiRequest.call(this, 'POST', '/subscriber/tag', body);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}