import type { AllEntities } from 'n8n-workflow';

type NodeMap = {
	tag: 'create' | 'delete' | 'get' | 'index' | 'update';
	['opt-in']: 'get' | 'getRedirect' | 'index';
	subscriber: 'subscribe' | 'unsubscribe' | 'index' | 'delete' | 'get' | 'search' | 'signIn' | 'signOff' | 'signOut' | 'tag' | 'tagged' | 'untag' | 'update';
	field: 'index'
};

export type KlickTippType = AllEntities<NodeMap>;