import { INodePropertyOptions } from "n8n-workflow";

export const createTag: INodePropertyOptions  = {
  name: 'Create Tag',
  value: 'createTag',
  description: 'Create a new manual tag in KlickTipp',
  routing: {
  request: {
    method: 'POST',
      url: '/tag',
      body: {
      name: '={{$parameter["name"]}}',
        text: '={{$parameter["text"]}}',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
    },
  },
  output: {
    postReceive: [
      {
        type: 'setKeyValue',
        properties: {
          tagId: '={{$responseItem}}',
          klicktippSessionId: '={{$json["klicktippSessionId"]}}',
          klicktippSessionName: '={{$json["klicktippSessionName"]}}',
        },
      },
    ],
  },
},
  action: 'Create a new tag',
};