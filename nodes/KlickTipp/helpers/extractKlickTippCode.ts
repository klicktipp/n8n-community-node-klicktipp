import { toNumber, isFinite } from 'lodash';

interface KlickTippError {
	error?: number;
	code?: number;
	field?: string;  // UI field label (e.g. "Lead Value", "Birthday") - may be empty
	name?: string;   // technical field key (e.g. "fieldLeadValue", "fieldBirthday", "email")
	reason?: string; // e.g. "must be a numeric value"
	raw?: unknown;   // optional: keep parsed JSON for debugging
}

export function extractKlickTippError(messages: string[]): KlickTippError | undefined {
	const jsonRegex = /\{[\s\S]*\}/; // first {...} block in the string

	for (const entry of messages) {
		const match = jsonRegex.exec(entry);
		if (!match) continue;

		try {
			const parsed = JSON.parse(match[0]) as any;

			const errorNumber = isFinite(toNumber(parsed?.error)) ? toNumber(parsed.error) : undefined;
			const codeNumber = isFinite(toNumber(parsed?.code)) ? toNumber(parsed.code) : undefined;

			const field = typeof parsed?.field === 'string' ? parsed.field.trim() : undefined;
			const name = typeof parsed?.name === 'string' ? parsed.name.trim() : undefined;
			const reason = typeof parsed?.reason === 'string' ? parsed.reason.trim() : undefined;

			// Return if we have either validation info or numeric error
			if (field || name || reason || typeof errorNumber === 'number') {
				return {
					error: errorNumber,
					code: codeNumber,
					field: field || undefined,
					name: name || undefined,
					reason: reason || undefined,
					raw: parsed,
				};
			}
		} catch {
			// silent fallback (extract KlickTipp code: skipped malformed JSON)
		}
	}

	return undefined;
}

export default extractKlickTippError;
