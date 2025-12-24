function buildValidationMessage(field?: string, name?: string, reason?: string): string | undefined {
	const f = (field ?? '').trim();
	const n = (name ?? '').trim();
	const r = (reason ?? '').trim();

	if (!r) return undefined; // reason is required for validation message

	const parts: string[] = [];
	if (f) parts.push(f);
	if (n) parts.push(`"${n}"`);

	// If we have neither field nor name, don't force "Validation error:" message
	if (parts.length === 0) return `Validation error: ${r}`;

	return `Validation error: ${parts.join(' ')} ${r}`;
}

export default buildValidationMessage;
