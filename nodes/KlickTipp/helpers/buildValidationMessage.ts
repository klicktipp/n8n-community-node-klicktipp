function buildValidationMessage(
	field?: string,
	name?: string,
	fieldValue?: string,
	reason?: string,
): string | undefined {
	const f = (field ?? '').trim();
	const n = (name ?? '').trim();
	const v = (fieldValue ?? '').trim();
	const r = (reason ?? '').trim();

	if (!r || (!f && !n && !v)) return undefined;

	const parts: string[] = [];
	if (f) parts.push(f);
	if (n) parts.push(`"${n}"`);
	if (v) parts.push(`with value "${v}"`);

	return `Validation error: ${parts.join(' ')} ${r}`;
}

export default buildValidationMessage;
