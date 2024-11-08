import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {
  handleError,
  updateDisplayOptions,
} from '../../utils/utilities';

export const properties: INodeProperties[] = [
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    placeholder: 'Enter email address (required)',
  },
  {
    displayName: 'Autoresponder',
    name: 'autoresponderId',
    type: 'string',
    default: '',
    placeholder: 'Enter the ID of the autoresponder (optional)',
  },
];

const displayOptions = {
  show: {
    resource: ['subscriber'],
    operation: ['resendAutoresponder'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  const email = this.getNodeParameter('email', index) as string;
  const autoresponderId = this.getNodeParameter('autoresponderId', index) as number;

  if (!email) {
    return handleError.call(this, 'The email address is required.');
  }

  // Construct request body
  const body: IDataObject = {
    email,
    ...(autoresponderId && { autoresponder: autoresponderId }),
  };

  try {
    await apiRequest.call(this, 'POST', '/subscriber/resend', body);
    return this.helpers.returnJsonArray({ success: true });
  } catch (error) {
    return handleError.call(this, error);
  }
}
