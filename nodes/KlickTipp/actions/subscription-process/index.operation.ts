import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { apiRequest } from '../../transport';

export const properties: INodeProperties[] = [];

export async function execute(this: IExecuteFunctions, index: number) {
  const responseData = await apiRequest.call(this, 'GET', `/list`);

  const executionData = this.helpers.constructExecutionMetaData(
    this.helpers.returnJsonArray(responseData as IDataObject),
    { itemData: { item: index } },
  );

  return executionData;
}