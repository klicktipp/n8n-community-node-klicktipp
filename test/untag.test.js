const test = require('node:test');
const assert = require('node:assert/strict');
const transport = require('../dist/nodes/KlickTipp/transport');
const untag = require('../dist/nodes/KlickTipp/actions/contact-tagging/untag.operation');
const { router } = require('../dist/nodes/KlickTipp/actions/router');

function context(items, version = 4, continueOnFail = false) {
	return {
		getNode: () => ({ typeVersion: version, parameters: {} }),
		getInputData: () => items,
		getNodeParameter: (name, index, fallback) =>
			({ resource: 'contact-tagging', operation: 'untag', ...items[index] })[name] ?? fallback,
		continueOnFail: () => continueOnFail,
		helpers: {
			returnJsonArray: (data) => [{ json: data }],
			constructExecutionMetaData: (data, meta) =>
				data.map((item) => ({ ...item, pairedItem: meta.itemData })),
		},
	};
}

test('untag supports versions, selections and partial failures', async (t) => {
	const original = transport.apiRequest;
	t.after(() => {
		transport.apiRequest = original;
	});
	let calls = [];
	transport.apiRequest = async (method, path, body) => {
		calls.push({ method, path, body });
	};
	for (const version of [1, 2, 3]) {
		calls = [];
		assert.deepEqual(
			await untag.execute.call(context([{ email: 'a@example.com', tagId: '7' }], version), 0),
			[{ json: { success: true } }],
		);
		assert.deepEqual(
			calls.map((c) => c.body.tagid),
			['7'],
		);
	}
	for (const tags of [['1'], ['1', '2', '1']]) {
		calls = [];
		const result = await untag.execute.call(context([{ email: 'a@example.com', tagIds: tags }]), 0);
		assert.deepEqual(
			calls.map((c) => c.body.tagid),
			[...new Set(tags)],
		);
		assert.ok(
			calls.every(
				(c) =>
					c.method === 'POST' && c.path === '/subscriber/untag' && c.body.email === 'a@example.com',
			),
		);
		assert.deepEqual(result, [{ json: { success: true }, pairedItem: { item: 0 } }]);
	}
	calls = [];
	await assert.rejects(
		() => untag.execute.call(context([{ email: 'a@example.com', tagIds: [] }]), 0),
		/Tag ID is missing/,
	);
	assert.equal(calls.length, 0);
	const manyTags = Array.from({ length: 51 }, (_, i) => String(i + 1));
	await untag.execute.call(context([{ email: 'a@example.com', tagIds: manyTags }]), 0);
	assert.deepEqual(calls.map((call) => call.body.tagid), manyTags);
	calls = [];
	transport.apiRequest = async (_method, _path, body) => {
		calls.push(body.tagid);
		if (body.tagid === '2')
			throw { message: 'failed', messages: ['{"error":403}'], httpCode: '406' };
	};
	await assert.rejects(
		() => untag.execute.call(context([{ email: 'a@example.com', tagIds: ['1', '2', '3'] }]), 0),
		(error) =>
			error.description.includes('Failed to untag tag ID "2"') &&
			error.description.includes('Tag not found'),
	);
	assert.deepEqual(calls, ['1', '2']);
	calls = [];
	const result = await router.call(
		context(
			[
				{ email: 'a@example.com', tagIds: ['1', '2', '3'] },
				{ email: 'b@example.com', tagIds: ['4'] },
			],
			4,
			true,
		),
	);
	assert.equal(result[0][0].json.error, 'failed');
	assert.equal(result[0][0].pairedItem.item, 0);
	assert.equal(result[0][1].pairedItem.item, 1);
	assert.deepEqual(calls, ['1', '2', '4']);
});
