import type { AllEntities } from 'n8n-workflow';

type NodeMap = {
	tag: 'create' | 'delete' | 'get' | 'index' | 'update';
	['opt-in']: 'get' | 'getRedirect' | 'index';
	subscriber:
		| 'resendAutoresponder'
		| 'subscribe'
		| 'unsubscribe'
		| 'index'
		| 'delete'
		| 'get'
		| 'search'
		| 'signIn'
		| 'signOff'
		| 'signOut'
		| 'tag'
		| 'tagged'
		| 'untag'
		| 'update';
	field: 'index' | 'get';
};

export type KlickTippType = AllEntities<NodeMap>;
