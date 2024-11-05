import {IDataObject, IDisplayOptions, INodeProperties} from "n8n-workflow";
import NodeCache from 'node-cache';

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


// Initialize the cache instance
const cache = new NodeCache({ stdTTL: 600 });

export function clearCache(keys?: string[]) {
  if (keys) {
    keys.forEach((key) => cache.del(key));
    console.log(`Cleared cache keys: ${keys.join(', ')}`);
  } else {
    cache.flushAll();
    console.log('Cleared all cache entries');
  }
}

export { cache };