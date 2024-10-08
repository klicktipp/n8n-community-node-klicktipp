import {INodePropertyOptions} from "n8n-workflow";

export const resendAutoresponder: INodePropertyOptions = {
  name: 'Resend Autoresponder',
  value: 'resendAutoresponder',
  description: 'Resend an autoresponder to an email address',
  routing: {
    request: {
      method: 'POST',
      url: '/subscriber/resend',
      body: {
        autoresponder: '={{$parameter.autoresponderId}}',
        email: '={{$parameter.email}}',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
      },
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
  action: 'Resend an autoresponder to an email address',
}