function adjustErrorMessage(error: number): string {
	switch (error) {
		case 4:
			return 'The email address is unsubscribed. You cannot re-subscribe an email address if the contact has unsubscribed.';
		case 5:
			return 'Invalid email address.';
		case 6:
			return 'There was an error sending the confirmation email.';
		case 7:
			return 'Email address not found.';
		case 8:
			return 'Invalid value in custom field. The provided value is not valid for the field type.';
		case 9:
			return 'The SMS number is already assigned to another contact. If you subscribe an email address and add a phone number, it must be unique.';
		case 10:
			return 'Update of contact failed.';
		case 11:
			return 'Invalid phone number.';
		case 12:
			return 'Internal error.';
		case 30:
			return 'The email address is blocked and cannot be used for subscription.';
		case 31:
			return 'SmartTags are only assigned by the system.';
		case 32:
			return 'You must specify either an email address or a SMS number.';
		case 401:
			return 'Contact not found.';
		case 402:
			return 'Opt-in process not found.';
		case 403:
			return 'Tag not found.';
		case 507:
			return 'You tried to add an email address to a contact that is already assigned to another contact.';
		default:
			return `Something went wrong. Please try again later. Error: ${error}`;
	}
}

function getKlickTippErrorMessage(error: any): string {
	// Nested numeric code inside cause.error
	const nested = error?.cause?.error;
	if (nested && typeof nested === 'object') {
		const numeric = nested.code ?? nested.error;
		if (typeof numeric === 'number') {
			return adjustErrorMessage(numeric);
		}
	}

	// Description that is not a number (e.g. "No such contact.")
	if (typeof error.description === 'string' && isNaN(parseInt(error.description, 10))) {
		return error.description;
	}

	// Description that is a number (or starts with one)
	if (typeof error.description === 'string') {
		const code = parseInt(error.description, 10);
		if (!isNaN(code)) {
			return adjustErrorMessage(code);
		}
	}

	// Fallback to HTTP status code
	const httpCode =
		typeof error.httpCode === 'string' ? parseInt(error.httpCode, 10) : error.httpCode;

	return adjustErrorMessage(httpCode);
}

export default getKlickTippErrorMessage;
