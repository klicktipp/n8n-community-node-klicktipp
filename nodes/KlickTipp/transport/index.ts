import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IPollFunctions,
	IRequestOptions,
} from 'n8n-workflow';

import { BASE_URL, KLICKTIPP_API_CREDENTIAL_NAME } from '../helpers/constants';
import { toQueryString } from '../utils/utilities';

async function logout(
	this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
	authenticationMethod: string,
	session: IDataObject,
	verifySSL: boolean,
) {
	if (!session.sessionName || !session.sessionId) {
		return;
	}

	const logoutOptions: IRequestOptions = {
		method: 'POST',
		uri: `${BASE_URL}/account/logout`,
		json: true,
		rejectUnauthorized: verifySSL,
	};

	try {
		await this.helpers.requestWithAuthentication.call(this, authenticationMethod, logoutOptions);
		this.logger.info('Logout succeeded.');
	} catch (error) {
		this.logger.error(`Logout failed: ${error instanceof Error ? error.message : String(error)}`);
	}
}

export async function apiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query?: IDataObject,
	uri?: string,
	option: IDataObject = {},
	defaultHeaders: IDataObject = {},
	session: IDataObject = {},
	verifySSL: boolean = true,
) {
	query = query || {};

	// Build headers
	const headers: IDataObject = {
		'Content-Type': 'application/x-www-form-urlencoded',
		...defaultHeaders,
	};

	// Encode data if necessary for POST/PUT using the custom function
	let requestData: string | undefined;
	if (method === 'POST' || method === 'PUT') {
		requestData = toQueryString(body);
		headers['Content-Length'] = Buffer.byteLength(requestData).toString();
	}

	const options: IRequestOptions = {
		headers,
		method,
		body,
		qs: query,
		uri: uri || `${BASE_URL}/${endpoint}`,
		useQuerystring: false,
		json: true,
		...option,
		rejectUnauthorized: verifySSL,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	try {
		// Perform the main API request
		return await this.helpers.requestWithAuthentication.call(
			this,
			KLICKTIPP_API_CREDENTIAL_NAME,
			options,
		);
	} finally {
		// Perform logout request in the finally block to ensure it always runs
		const credentials = await this.getCredentials(KLICKTIPP_API_CREDENTIAL_NAME);
		await logout.call(this, KLICKTIPP_API_CREDENTIAL_NAME, credentials, verifySSL);
	}
}

export default apiRequest;
