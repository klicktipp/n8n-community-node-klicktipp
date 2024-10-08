import {INodePropertyOptions} from "n8n-workflow";

export const getTag: INodePropertyOptions = {
  name: 'Get Tag',
  value: 'getTag',
  description: 'Get the definition of a specific tag',
  routing: {
    request: {
      method: 'GET',
      url: '=/tag/{{$parameter["tagId"]}}',
      headers: {
        Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
      },
      json: true,
    },
    output: {
      postReceive: [
        {
          type: 'setKeyValue',
          properties: {
            payload: '={{$responseItem}}',
            klicktippSessionId: '={{$json["klicktippSessionId"]}}',
            klicktippSessionName: '={{$json["klicktippSessionName"]}}',
          },
        },
      ],
    },
  },
  action: 'Get a specific tag by ID',
}