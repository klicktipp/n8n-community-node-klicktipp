import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {updateDisplayOptions} from "../../utils/utilities";

export const properties: INodeProperties[] = [];

const displayOptions = {
  show: {
    resource: ['tag'],
    operation: ['index'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
  try {
    const responseData = await apiRequest.call(this, 'GET', `/tag`);

    const executionData = this.helpers.constructExecutionMetaData(
      this.helpers.returnJsonArray(responseData as IDataObject),
      { itemData: { item: index } },
    );

    return executionData;
  } catch (error) {
    return this.helpers.returnJsonArray({ success: false, error: error.message || 'Undefined error' });
  }
}