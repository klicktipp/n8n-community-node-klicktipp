import type { AllEntities } from 'n8n-workflow';

type NodeMap = {
	tag: 'create' | 'delete' | 'get' | 'index' | 'update';
	['opt-in']: 'get' | 'getRedirect' | 'index';
	subscriber:
		| 'subscribe'
		| 'unsubscribe'
		| 'index'
		| 'delete'
		| 'get'
		| 'search'
		| 'tagged'
		| 'update';
	field: 'index' | 'get';
	['contact-tagging']: 'tag' | 'untag';
};

export type KlickTippType = AllEntities<NodeMap>;
