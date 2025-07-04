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
import pkg from '../../../package.json';

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
	const isForm = (method === 'POST' || method === 'PUT') && Object.keys(body).length > 0;
	const requestBody = isForm ? toQueryString(body) : body;

	// Build headers
	const headers: IDataObject = {
		...defaultHeaders,
		'Client-Identifier': 'n8n-KlickTipp',
		'Connector-Version': `${pkg.version}`,
		'NodeJS-Version': process.versions.node,
		...(isForm && {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(requestBody as string).toString(),
		}),
	};

	const requestOptions: IRequestOptions = {
		headers,
		method,
		qs: query,
		uri: uri || `${BASE_URL}/${endpoint}`,
		useQuerystring: false,
		json: true,
		rejectUnauthorized: verifySSL,
		...option,
	};

	if (isForm) {
		requestOptions.body = requestBody;
	}

	try {
		// Perform the main API request
		return await this.helpers.requestWithAuthentication.call(
			this,
			KLICKTIPP_API_CREDENTIAL_NAME,
			requestOptions,
		);
	} finally {
		// Perform logout request in the finally block to ensure it always runs
		const credentials = await this.getCredentials(KLICKTIPP_API_CREDENTIAL_NAME);
		await logout.call(this, KLICKTIPP_API_CREDENTIAL_NAME, credentials, verifySSL);
	}
}

export default apiRequest;
