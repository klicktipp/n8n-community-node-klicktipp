/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import type {
	IDataObject,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class KlickTippTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'KlickTipp Trigger',
		name: 'klicktippTrigger',
		icon: { light: 'file:klicktipp.svg', dark: 'file:klicktipp.dark.svg' },
		group: ['trigger'],
		version: 1,
		description:
			'Triggers when a webhook event occurs in KlickTipp, such as a tag being added, an email being opened or sent, a link clicked, an SMS sent, and more.',
		defaults: {
			name: 'KlickTipp Trigger',
		},
		inputs: [],
		/* eslint-disable n8n-nodes-base/node-class-description-outputs-wrong */
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'klickTippApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
    		path: '={{ $parameter["path"] }}',
				isFullPath: true,
			},
		],

		properties: [
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				default: '',
				placeholder: 'webhook',
				description:
					"The path to listen to, dynamic values could be specified by using ':', e.g. 'your-path/:dynamic-value'. Leave empty to use a unique, auto-generated path.",
			},
			{
				displayName:
					'For more information on creating a webhook in KlickTipp, see the online <a href="https://www.klicktipp.com/de/support/wissensdatenbank/outbound-erstellen-und-nutzen/" target="_blank">Help</a>.',
				name: 'webhookSetup',
				type: 'notice',
				default: '',
			},
		],
	};

	// Handles the POST webhook request from KlickTipp.
	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		return {
			workflowData: [this.helpers.returnJsonArray(req.body as IDataObject)],
		};
	}
}
