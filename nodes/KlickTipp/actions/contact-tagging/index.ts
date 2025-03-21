import type { INodeProperties } from 'n8n-workflow';

import * as tag from './tag.operation';
import * as untag from './untag.operation';

export { tag, untag };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact-tagging'],
			},
		},
		options: [
			{
				name: 'Tag Contact',
				value: 'tag',
				description: 'Adds one or more tags to a contact',
				action: 'Tag contact',
			},
			{
				name: 'Untag Contact',
				value: 'untag',
				description: 'Removes a tag from a contact',
				action: 'Untag contact',
			},
		],
		default: 'tag',
	},
	...tag.description,
	...untag.description,
];
