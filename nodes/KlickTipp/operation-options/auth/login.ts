import {INodePropertyOptions} from "n8n-workflow";

export const login: INodePropertyOptions = {
  name: 'Login',
  value: 'login',
  description: 'Logs into KlickTipp API',
  routing: {
    request: {
      method: 'POST',
      url: '/account/login',
      body: {
        username: '={{$parameter.username}}',
        password: '={{$parameter.password}}',
      },
      json: true,
    },
    output: {
      postReceive: [
        {
          type: 'setKeyValue',
          properties: {
            klicktippSessionId: '={{$responseItem.sessid}}',
            klicktippSessionName: '={{$responseItem.session_name}}',
          },
        },
      ],
    },
  },
  action: 'Login',
}