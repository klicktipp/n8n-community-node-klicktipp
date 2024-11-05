import {
  IAuthenticateGeneric,
  ICredentialDataDecryptedObject,
  ICredentialType,
  IHttpRequestHelper,
  INodeProperties,
} from 'n8n-workflow';
import {BASE_URL} from "../nodes/KlickTipp/helpers/constants";

export class KlickTippApi implements ICredentialType {
  name = 'klickTippApi';
  displayName = 'KlickTipp API';
  documentationUrl = ''; // Add documentation URL if available
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
    },
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
    {
      displayName: 'Session ID',
      name: 'sessionId',
      type: 'hidden',
      typeOptions: {
        expirable: true,
      },
      default: '',
    },
    {
      displayName: 'Session Name',
      name: 'sessionName',
      type: 'hidden',
      typeOptions: {
        expirable: true,
      },
      default: '',
    },
  ];

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

    // Extract session ID and session name from the response
    const { sessid, session_name } = loginResponse;

    if (!sessid || !session_name) {
      throw new Error('Login failed: Invalid credentials or missing session data.');
    }

    // Return both sessionId and sessionName to be stored in the credentials
    return {
      sessionId: sessid,
      sessionName: session_name,
    };
  }

  // Authentication method to use the session data from preAuthentication
  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Cookie: '={{ $credentials.sessionName + "=" + $credentials.sessionId }}',
      },
    },
  };
}

