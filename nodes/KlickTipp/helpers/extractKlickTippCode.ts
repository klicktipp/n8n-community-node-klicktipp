/**
 * Extract a numeric KlickTipp error and code from a messages[] array.
 * @param messages - The array returned by the KlickTipp API (`messages` field)
 * @returns The numeric error and optional code
 *
 * @example
 * extractKlickTippError(['406 - {"error":10,"code":11}']); -> { error: 10, code: 11 }
 */

import { toNumber, isFinite } from 'lodash';

interface KlickTippError {
	error: number;
	code?: number;
}

export function extractKlickTippError(messages: string[]): KlickTippError | undefined {
	const jsonRegex = /\{.*\}/; // first {...} block in the string

	for (const entry of messages) {
		const match = jsonRegex.exec(entry); // e.g. {"error":10,"code":11}

		if (!match) continue;

		try {
			const { error, code } = JSON.parse(match[0]);
			const errorNumber = toNumber(error);
			const codeNumber = toNumber(code);

			if (isFinite(errorNumber)) {
				return {
					error: errorNumber,
					code: isFinite(codeNumber) ? codeNumber : undefined,
				};
			}
		} catch {
			// silent fallback (extract KlickTipp code: skipped malformed JSON)
		}
	}
	return undefined;
}

export default extractKlickTippError;
