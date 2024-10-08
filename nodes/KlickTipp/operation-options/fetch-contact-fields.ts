import {INodePropertyOptions} from "n8n-workflow";

export const fetchContactFields: INodePropertyOptions = {
  name: 'Fetch Contact Fields',
  value: 'fetchFields',
  description: 'Fetch the contact fields',
  routing: {
    request: {
      method: 'GET',
      url: '/field',
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
  action: 'Fetch a list of fields',
}