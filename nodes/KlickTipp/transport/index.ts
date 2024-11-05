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
import { BASE_URL } from '../helpers/constants';

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
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	const authenticationMethod = 'klickTippApi';

	try {
		// Perform the main API request
		return await this.helpers.requestWithAuthentication.call(this, authenticationMethod, options);
	} finally {
		// Perform the logout request
		const credentials = await this.getCredentials('klickTippApi');
		if (credentials.sessionName && credentials.sessionId) {
			const logoutOptions: IRequestOptions = {
				method: 'POST',
				uri: `${BASE_URL}/account/logout`,
				headers: {
					Cookie: `${credentials.sessionName}=${credentials.sessionId}`,
				},
				json: true,
			};
			try {
				await this.helpers.request!(logoutOptions);
				this.logger.info('Logout succeed.');
			} catch (error) {
				// Log the error but don't throw
				this.logger.error(`Logout failed: ${error.message}`);
			}
		}
	}
}

export default apiRequest;
