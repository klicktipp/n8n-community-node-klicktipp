import {INodePropertyOptions} from "n8n-workflow";

export const deleteTag: INodePropertyOptions = {
  name: 'Delete Tag',
  value: 'deleteTag',
  description: 'Delete a manual tag in KlickTipp',
  routing: {
    request: {
      method: 'DELETE',
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
            success: '={{!$responseItem.error}}',
            klicktippSessionId: '={{$json["klicktippSessionId"]}}',
            klicktippSessionName: '={{$json["klicktippSessionName"]}}',
          },
        },
      ],
    },
  },
  action: 'Delete a tag',
}