import qs from 'qs';

import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IPollFunctions,
	IRequestOptions,
} from 'n8n-workflow';
import { Buffer } from 'buffer';
import { BASE_URL, KLICKTIPP_API_CREDENTIAL_NAME } from '../helpers/constants';

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

	// Add session cookie if provided
	if (session.sessionName && session.sessionId) {
		headers['Cookie'] = `${session.sessionName}=${session.sessionId}`;
	}

	// Encode data if necessary for POST/PUT
	let requestData: string | undefined;
	if (method === 'POST' || method === 'PUT') {
		requestData = qs.stringify(body); // Use qs to encode the body
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
