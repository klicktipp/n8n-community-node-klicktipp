const test = require('node:test');
const assert = require('node:assert/strict');
const transport = require('../dist/nodes/KlickTipp/transport');
const subscribe = require('../dist/nodes/KlickTipp/actions/subscriber/subscribe.operation');
const { router } = require('../dist/nodes/KlickTipp/actions/router');

function context(items, version = 4, continueOnFail = false) {
	return {
		getNode: () => ({ typeVersion: version, parameters: {} }),
		getInputData: () => items,
		getNodeParameter: (name, i, fallback) =>
			({
				resource: 'subscriber',
				operation: 'subscribe',
				email: '',
				smsNumber: '',
				listId: '',
				fields: {},
				...items[i],
			})[name] ?? fallback,
		continueOnFail: () => continueOnFail,
		helpers: {
			returnJsonArray: (data) => [{ json: data }],
			constructExecutionMetaData: (data, meta) =>
				data.map((item) => ({ ...item, pairedItem: meta.itemData })),
		},
	};
}

test('subscription request sequences, versions and error handling', async (t) => {
	const original = transport.apiRequest;
	t.after(() => {
		transport.apiRequest = original;
	});
	let calls = [];
	transport.apiRequest = async (method, path, body) => {
		calls.push({ method, path, body });
		return { id: '42', tags: calls.length };
	};
	for (const tags of [['1'], ['1', '2', '3'], []]) {
		calls = [];
		const result = await subscribe.execute.call(
			context([{ smsNumber: ' 123 ', email: ' ', tagIds: tags, listId: 9 }]),
			0,
		);
		assert.equal(calls.length, Math.max(1, tags.length));
		assert.deepEqual(
			calls.map((c) => c.body.tagid),
			tags.length ? tags : [undefined],
		);
		assert.ok(calls.every((c) => c.body.smsnumber === '123' && !('email' in c.body)));
		assert.equal(result[0].pairedItem.item, 0);
	}
	calls = [];
	await subscribe.execute.call(context([{ email: 'a@example.com', tagIds: ['1', '2', '3'] }]), 0);
	assert.deepEqual(
		calls.map((c) => c.path),
		['/subscriber', '/subscriber/tag', '/subscriber/tag', '/subscriber/42'],
	);
	assert.deepEqual(calls[1].body, { email: 'a@example.com', tagids: ['2'] });
	for (const version of [1, 2, 3]) {
		calls = [];
		await subscribe.execute.call(context([{ email: 'a@example.com', tagId: '7' }], version), 0);
		assert.equal(calls.length, 1);
		assert.equal(calls[0].body.tagid, '7');
	}
	calls = [];
	transport.apiRequest = async (method, path, body) => {
		calls.push({ method, path, body });
		if (body.tagid === '2') throw { message: 'failed', messages: [] };
		return { id: '42' };
	};
	const result = await router.call(
		context(
			[
				{ smsNumber: '123', tagIds: ['1', '2', '3'] },
				{ smsNumber: '456', tagIds: ['4'] },
			],
			4,
			true,
		),
	);
	assert.equal(result[0][0].json.error, 'failed');
	assert.equal(result[0][0].pairedItem.item, 0);
	assert.equal(result[0][1].pairedItem.item, 1);
	assert.deepEqual(
		calls.map((c) => c.body.tagid),
		['1', '2', '4'],
	);
	await assert.rejects(() =>
		subscribe.execute.call(context([{ smsNumber: '123', tagIds: ['1', '2'] }]), 0),
	);
});
