/**
 * Extract a numeric KlickTipp error code from a messages[] array.
 * Priority: `code` the `error`.
 *
 * @param messages - The array returned by the KlickTipp API (`messages` field).
 * @returns The numeric error code, or `undefined` if none found.
 *
 * @example
 * extractCode(['406 - {"error":10,"code":11}']); -> 11
 */

import { toNumber, isFinite } from 'lodash';

function extractKlickTippCode(messages: string[]): number | undefined {
	const jsonRegex = /\{.*\}/; // first {...} block in the string

	for (const entry of messages) {
		const match = jsonRegex.exec(entry); // e.g. {"error":10,"code":11}

		if (!match) {
			continue;
		}

		try {
			const { code, error } = JSON.parse(match[0]);
			const codeNumber = toNumber(code ?? error); // prefer code, fall back to error

			if (isFinite(codeNumber)) {
				return codeNumber;
			}
		} catch {
			console.log('extract KlickTipp code: skipped malformed JSON:', entry);
		}
	}
	return undefined;
}

export default extractKlickTippCode;
