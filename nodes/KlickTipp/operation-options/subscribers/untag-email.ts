import {INodePropertyOptions} from "n8n-workflow";

export const untagEmail: INodePropertyOptions = {
  name: 'Untag Email',
  value: 'untagEmail',
  description: 'Untag an email',
  routing: {
    request: {
      method: 'POST',
      url: '/subscriber/untag',
      body: {
        email: '={{$parameter["email"]}}',
        tagid: '={{$parameter["tagId"]}}',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: '={{$json["klicktippSessionName"]}}={{$json["klicktippSessionId"]}}',
      }
    },
    output: {
      postReceive: [
        {
          type: 'setKeyValue',
          properties: {
            success: '={{!$responseItem.error}}',
            klicktippSessionId: '={{$json["klicktippSessionId"]}}',
            klicktippSessionName: '={{$json["klicktippSessionName"]}}',
          },
        },
      ],
    }
  },
  action: 'Untag an email',
}