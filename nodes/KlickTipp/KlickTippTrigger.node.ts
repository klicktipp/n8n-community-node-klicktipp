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
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				noDataExpression: true,
				default: 'no',
				description: 'Choose "Yes" only if your KlickTipp webhook sends auth in the POST body as a static parameter. Choose "No" if no auth is required.',
				options: [
					{
						name: 'No',
						value: 'no',
					},
					{
						name: 'Yes',
						value: 'yes',
					},
				],
			},
			{
				displayName: 'Parameter Key',
				name: 'authFieldName',
				type: 'string',
				default: 'Authorization',
				description: 'Enter the exact body parameter key configured in KlickTipp. Usually: Authorization.',
				displayOptions: {
					show: {
						authentication: ['yes'],
					},
				},
			},
			{
				displayName: 'Parameter Value',
				name: 'authValue',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Paste the webhook token exactly as stored in KlickTipp. Do not add "Bearer", quotes, or extra spaces.',
				displayOptions: {
					show: {
						authentication: ['yes'],
					},
				},
			},
			{
				displayName:
					'In KlickTipp, create/edit your webhook, set the HTTP method to POST, enable "Add static value", and add the same key-value pair as a static POST body parameter. If this is missing, body authentication will fail.',
				name: 'bodyAuthSetup',
				type: 'notice',
				default: '',
				displayOptions: {
					show: {
						authentication: ['yes'],
					},
				},
			},
		],
	};

	// Handles the POST webhook request from KlickTipp.
	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const authentication = this.getNodeParameter('authentication', 'no') as string;

		if (authentication === 'yes') {
			const fieldName = String(this.getNodeParameter('authFieldName', 'Authorization')).trim();
			const expectedValue = String(this.getNodeParameter('authValue', ''));
			const receivedValue = fieldName ? req.body?.[fieldName] : undefined;

			if (!fieldName || receivedValue !== expectedValue) {
				const res = this.getResponseObject();
				res.status(401).json({
					message: 'Unauthorized webhook request',
				});

				return {
					noWebhookResponse: true,
				};
			}
		}

		return {
			workflowData: [this.helpers.returnJsonArray(req.body as IDataObject)],
		};
	}
}
