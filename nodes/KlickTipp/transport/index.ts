import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IPollFunctions,
	IHttpRequestOptions,
	NodeOperationError,
} from 'n8n-workflow';

import { BASE_URL, KLICKTIPP_API_CREDENTIAL_NAME } from '../helpers/constants';
import { toQueryString, buildUrl } from '../utils/utilities';
import pkg from '../../../package.json';

export async function apiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
	defaultHeaders: IDataObject = {},
	verifySSL = true,
) {
	// Fetch credentials once; fail fast with a friendly message.
	try {
		await this.getCredentials(KLICKTIPP_API_CREDENTIAL_NAME);
	} catch {
		throw new NodeOperationError(
			this.getNode(),
			'KlickTipp credentials are required but not configured.',
		);
	}

	const isForm = (method === 'POST' || method === 'PUT') && Object.keys(body).length > 0;
	const requestBody = isForm ? toQueryString(body) : body;

	const headers: IDataObject = {
		...defaultHeaders,
		'Client-Identifier': 'n8n-KlickTipp',
		'Connector-Version': pkg.version,
		...(isForm && {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(requestBody as string).toString(),
		}),
	};

	const requestOptions: IHttpRequestOptions = {
		headers,
		method,
		qs: query,
		url: uri ?? buildUrl(BASE_URL, endpoint),
		json: true,
		skipSslCertificateValidation: !verifySSL,
		...option,
	};

	if (isForm) {
		requestOptions.body = requestBody;
	}

	// Executes the authenticated KlickTipp request and, when requested, forces a fresh
	// credential state by clearing the cached session cookie so n8n re-authenticates.
	const doRequest = async (forceRefresh = false) => {
		const credentials = forceRefresh
			? await this.getCredentials(KLICKTIPP_API_CREDENTIAL_NAME)
			: undefined;

		return await this.helpers.httpRequestWithAuthentication.call(
			this,
			KLICKTIPP_API_CREDENTIAL_NAME,
			requestOptions,
			forceRefresh && credentials
				? {
						credentialsDecrypted: {
							id: '_force_refresh_',
							name: '_force_refresh_',
							type: KLICKTIPP_API_CREDENTIAL_NAME,
							data: {
								...credentials,
								sessionCookie: '',
							},
						},
					}
				: undefined,
		);
	};

	try {
		return await doRequest(false);
	} catch (error) {
		if (error.httpCode === '403') {
			return await doRequest(true);
		}
		throw error;
	}
}
