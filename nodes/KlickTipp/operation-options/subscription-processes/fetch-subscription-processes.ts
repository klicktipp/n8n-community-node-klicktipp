import {INodePropertyOptions} from "n8n-workflow";

export const fetchSubscriptionProcesses: INodePropertyOptions = {
  name: 'Fetch Subscription Processes',
  value: 'fetchSubscriptionProcesses',
  description: 'Fetch subscription processes',
  routing: {
    request: {
      method: 'GET',
      url: '/list',
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
          },
        },
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
  action: 'Fetch a list of subscription processes',
}