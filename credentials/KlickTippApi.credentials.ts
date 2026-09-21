import {
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
	IHttpRequestMethods,
} from 'n8n-workflow';
import { BASE_URL } from "../nodes/KlickTipp/helpers/constants";

export class KlickTippApi implements ICredentialType {
	name = 'klickTippApi';
	displayName = 'KlickTipp API';
	documentationUrl = 'https://www.klicktipp.com/support/knowledge-base/install-klicktipp-node-n8n?source=n8n';
	icon = {
		light: 'file:../nodes/KlickTipp/klicktipp.svg',
		dark: 'file:../nodes/KlickTipp/klicktipp.dark.svg',
	} as const;
	properties: INodeProperties[] = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		// eslint-disable-next-line @n8n/community-nodes/credential-unnecessary-password
		{
			displayName: 'Session Cookie',
			name: 'sessionCookie',
			type: 'hidden',
			typeOptions: {
				expirable: true,
				password: true,
			},
			default: '',
		}
	];

	test = {
		request: {
			method: 'POST' as IHttpRequestMethods,
			url: `${BASE_URL}/account/login`,
			body: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.password}}',
			},
			json: true,
		},
	};

	async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
		const loginResponse = await this.helpers.httpRequest({
			method: 'POST',
			url: `${BASE_URL}/account/login`,
			body: {
				username: credentials.username,
				password: credentials.password,
			},
			json: true,
		});

		const { sessid, session_name } = loginResponse as {
			sessid?: string;
			session_name?: string;
		};

		if (!sessid || !session_name) {
			throw new Error('Login failed: Invalid credentials or missing session data.');
		}

		return {
			sessionCookie: `${session_name}=${sessid}`,
		};
	}

	// Authentication method to use the session data from preAuthentication
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Cookie: '={{$credentials.sessionCookie}}',
			},
		},
	};
}
