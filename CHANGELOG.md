# Changelog

## Version 1.0.0 (2024-11-08)
- **Initial Release**:
  - Launched the node with core functionality, supporting essential operations and configurations.

## Version 1.0.1 (2024-11-08)
- **Improvements**:
  - Improved UI components.
- **Fixes**:
  - Fixed an issue with dropdown lists to ensure correct autocompletion when changing credentials.

## Version 1.0.2 (2024-11-11)
- **New Features**:
  - Enabled support for dark and light theme icons.

## Version 1.0.3 (2024-11-14)
- **Improvements**:
  - Improved user experience by removing the `required: true` field for the klickTippApi credential, making it more flexible.

## Version 1.0.4 (2024-11-18)
- **Improvements**
  - Updated the structure of the returned data across nodes to ensure consistency and better compatibility with downstream integrations.

## Version 1.0.5 (2024-12-09)
- **Improvements**
  - Added support for subscriptions with either email or phone number, ensuring better user flexibility.

## Version 1.0.6 (2024-12-18)
- **New Features**
  - Introduced the Field get node, enabling seamless access to custom field data for enhanced workflow capabilities.

## Version 1.0.7 (2025-01-24)
- **Changes**
  - Removed the Autoresponder node.

## Version 1.0.8 (2025-03-21)
- **New Features**
	- Added "KlickTipp Trigger" node. 
- **Changes**
  - Created "Contact Tagging" resource for "Tag Contact" and "Untag Contact" nodes.
	- Updated the wording in nodes: names, descriptions, parameters, placeholders, error handling.
	- Removed API Key from credentials, removed Sing-in, Sign-off and Sign-out nodes.

## Version 1.0.9 (2025-03-28)
- **Changes**
    - Removed unused runtime dependencies to comply with n8n core integration requirements.

## Version 1.0.10 (2025-04-15)
- **Changes**
    - Removed unnecessary `Buffer` import to resolve linter issues for n8n Cloud compatibility.

## Version 1.0.11 (2025-04-17)
- **Improvements**
    - Added sorting by label for options in drop-down.
		- Added help banner for "Add or Update Contact" node.
		- Added functionality of displaying error messages from KlickTipp API.

## Version 1.0.12 (2025-05-27)
- **Bugfix**
    - Fixed an issue where form-encoded requests were not correctly constructed, leading to 406 errors from the KlickTipp API.

## Version 1.0.13 (2025-06-05)
- **Improvements**
    - Enabled KlickTipp node to be used as an AI tool.

## Version 1.0.14 (2025-06-26)
- **Bugfix**
    - Changed the link to credential documentation.

## Version 1.0.15 (2025-06-30)
- **Bugfix**
    - Updated the documentation link.

## Version 1.0.16 (2025-07-11)
- **New Features**
	- Added ability to update/delete/get contact by email.
- **Improvements**
  - Changed trigger description.

## Version 1.0.17 (2025-07-11)
- **Improvements**
  - Changed node names and descriptions.

## Version 1.0.18 (2025-07-11)
- **Bugfix**
  - Fixed error with nodes order.

## Version 1.0.19 (2025-08-05)
- **Improvements**
	- Made email as a default value for select in update/delete/get contact nodes.
	- Improved the error handling logic.

## Version 1.0.20 (2025-09-08)
- **Improvements**
	- Improved the error handling logic for "Add or Update Contact" node.

## Version 1.0.21 (2025-09-16)
- **Bugfix**
	- Improved the error handling logic for "Update Contact", "Get Contact", "Delete Contact" nodes.

## Version 1.0.22 (2025-10-16)
- **Bugfix**
	- Improved the error handling logic.

## Version 1.0.23 (2025-11-07)
- **Improvements**
	- Enrichment of requests.

## Version 1.0.24 (2025-11-10)
- **Documentation**
  - Fix README typos and formatting.

## Version 1.0.25 (2025-11-18)
- **Improvements**
  - Added path for "KlickTipp Trigger" node.

## Version 1.0.26 (2025-11-21)
- **Bugfix**
  - Improved the error handling logic for credentials usage.

## Version 1.0.27 (2025-11-25)
- **Improvements**
  - Replaced "IRequestOptions" with "IHttpRequestOptions".
	- Removed console.log in extractKlickTippCode.ts.

## Version 1.0.28 (2025-12-04)
- **Improvements**
  - Updated description for "Delete tag" node.

## Version 1.0.29 (2026-01-05)
- **New Features**
  - Added filtering options for "List Contacts" and "search Tagged Contacts" nodes.
