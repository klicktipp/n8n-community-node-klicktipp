import {INodePropertyOptions} from "n8n-workflow";

export const getSubscriberById: INodePropertyOptions = {
  name: 'Get Subscriber',
  value: 'getSubscriber',
  description: 'Get information for a specific subscriber',
  routing: {
    request: {
      method: 'GET',
      url: '=/subscriber/{{$parameter["subscriberId"]}}',
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
  action: 'Get a specific subscriber information by ID',
}