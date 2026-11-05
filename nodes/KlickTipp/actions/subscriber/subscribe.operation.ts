import type { IDataObject, IExecuteFunctions, INodeProperties, NodeApiError } from 'n8n-workflow';
import { apiRequest } from '../../transport';
import {
	handleError,
	handleObjectResponse,
	transformDataFields,
	updateDisplayOptions,
} from '../../utils/utilities';

export const properties: INodeProperties[] = [
	{
		displayName:
			'If a contact with the same email address or SMS number already exists, it will be updated.',
		name: 'info',
		type: 'notice',
		default: '',
	},
	{
		displayName: 'Email Address',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'Enter email address',
	},
	{
		displayName: 'SMS Number',
		name: 'smsNumber',
		type: 'string',
		default: '',
		placeholder: 'Enter SMS number',
	},
	{
		displayName: 'Opt-In Process Name or ID',
		name: 'listId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOptInProcesses',
		},
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		default: '',
	},
	{
		displayName: 'Tag Name or ID',
		name: 'tagId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTags',
		},
		default: '',
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: { show: { '@version': [1, 2, 3] } },
	},
	{
		displayName: 'Tag Names or IDs',
		name: 'tagIds',
		type: 'multiOptions',
		typeOptions: { loadOptionsMethod: 'getTagsWithoutPlaceholder' },
		default: [],
		description:
			'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		displayOptions: { show: { '@version': [4] } },
	},
	{
		displayName:
			'For SMS-only contacts, each selected tag creates a separate subscribe call and increases API usage.',
		name: 'smsTagUsageNotice',
		type: 'notice',
		default: '',
		displayOptions: { show: { '@version': [4] } },
	},
	{
		displayName: 'Data Fields',
		name: 'fields',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		description: 'Select the data field (optional)',
		options: [
			{
				name: 'dataFields',
				displayName: 'Data Field',
				values: [
					{
						displayName: 'Field Name or ID',
						name: 'fieldId',
						type: 'options',
						required: true,
						typeOptions: {
							loadOptionsMethod: 'getFields',
						},
						default: '',
						description:
							'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
					},
					{
						displayName: 'Field Value',
						name: 'fieldValue',
						type: 'string',
						default: '',
						description: 'Enter the value for the selected field',
					},
				],
			},
		],
	},
];

const displayOptions = {
	show: {
		resource: ['subscriber'],
		operation: ['subscribe'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const email = this.getNodeParameter('email', index) as string;
	const listId = this.getNodeParameter('listId', index) as number;
	const version = this.getNode().typeVersion ?? 1;
	const tagIds =
		version >= 4
			? (this.getNodeParameter('tagIds', index, []) as string[]).filter(Boolean)
			: [this.getNodeParameter('tagId', index, '') as string].filter(Boolean);
	const [tagId, ...additionalTagIds] = tagIds;
	const smsNumber = this.getNodeParameter('smsNumber', index) as string;
	const fields = this.getNodeParameter('fields', index) as IDataObject;

	// Validate that at least one of email or smsNumber is provided
	if (version >= 4 ? !email.trim() && !smsNumber.trim() : !email && !smsNumber) {
		return handleError.call(this, 'Email or SMS number is missing');
	}

	// Construct request body
	const body: IDataObject = {
		...((version >= 4 ? email.trim() : email) && { email: email.trim() }),
		...((version >= 4 ? smsNumber.trim() : smsNumber) && { smsnumber: smsNumber.trim() }),
		...(listId && { listid: listId }),
		...(tagId && { tagid: tagId }),
		...(fields?.dataFields && { fields: transformDataFields(fields.dataFields as IDataObject[]) }),
	};

	try {
		let responseData = await apiRequest.call(this, 'POST', '/subscriber', body);
		if (version >= 4 && additionalTagIds.length) {
			const emailValue = email.trim();
			if (emailValue) {
				for (const additionalTagId of additionalTagIds) {
					await apiRequest.call(this, 'POST', '/subscriber/tag', {
						email: emailValue,
						tagids: [additionalTagId],
					});
				}
				if (responseData.id) {
					responseData = await apiRequest.call(
						this,
						'GET',
						`/subscriber/${responseData.id as string}`,
					);
				}
			} else {
				for (const additionalTagId of additionalTagIds) {
					responseData = await apiRequest.call(this, 'POST', '/subscriber', {
						smsnumber: smsNumber.trim(),
						tagid: additionalTagId,
					});
				}
			}
		}
		return handleObjectResponse.call(this, responseData, index);
	} catch (error) {
		return handleError.call(this, error as NodeApiError);
	}
}
