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
		description: 'Triggers on a new event',
		defaults: {
			name: 'KlickTipp Trigger',
		},
		inputs: [],
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
				path: 'webhook',
			}
		],
		properties: [
			{
				displayName: 'For more information on creating a webhook in KlickTipp, see the online <a href="https://www.klicktipp.com/de/support/wissensdatenbank/outbound-erstellen-und-nutzen/" target="_blank">Help</a>.',
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
