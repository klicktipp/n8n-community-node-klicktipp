import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import { handleError, handleObjectResponse, updateDisplayOptions } from '../../utils/utilities';

export const properties: INodeProperties[] = [
  {
    // eslint-disable-next-line n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options
    displayName: 'Field ID',
    name: 'fieldId',
    type: 'options',
    typeOptions: {
      loadOptionsMethod: 'getFields',
    },
    default: '',
    options: [],
    description:
      'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
  },
];

const displayOptions = {
  show: {
    resource: ['field'],
    operation: ['get'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const fieldId = this.getNodeParameter('fieldId', index) as string;

  //Extract just field name, i.e. CompanyName
  const fieldName = fieldId.replace(/^field/, '');

  if (!fieldName) {
    return handleError.call(this, 'The field ID is required.');
  }

  try {
    const responseData = await apiRequest.call(this, 'GET', `/field/${fieldName}`);
    return handleObjectResponse.call(this, responseData, index);
  } catch (error) {
    return handleError.call(this, error);
  }
}
