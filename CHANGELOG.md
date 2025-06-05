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
  - Added support for subscriptions with either email or phone number, ensuring better user flexibility

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