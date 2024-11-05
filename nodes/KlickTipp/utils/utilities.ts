import {IDataObject, IDisplayOptions, INodeProperties} from "n8n-workflow";

import { merge, reduce } from 'lodash';

export function updateDisplayOptions(
  displayOptions: IDisplayOptions,
  properties: INodeProperties[],
) {
  return properties.map((nodeProperty) => {
    return {
      ...nodeProperty,
      displayOptions: merge({}, nodeProperty.displayOptions, displayOptions),
    };
  });
}

export function transformDataFields(dataFields: IDataObject[]): IDataObject {
  return reduce(
    dataFields,
    (acc, field) => {
      const fieldId = field.fieldId as string;
      if (fieldId) {
        acc[fieldId] = field.fieldValue;
      }
      return acc;
    },
    {} as IDataObject,
  );
}