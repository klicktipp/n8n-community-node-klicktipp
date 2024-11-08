# n8n-nodes-klicktipp

## KlickTipp API Integration for n8n

What is the KlickTipp Marketing Suite?

<a href="https://www.klicktipp.com/de?source=n8n" title="E-Mail-Marketing" target="_blank" rel="noopener noreferrer">KlickTipp Marketing Suite</a> is a digital marketing platform that empowers creators and small businesses to generate leads and turn them into passionate customers. It boosts growth with GDPR-compliant tools for email and SMS marketing, marketing automation, landing pages, and conversion rate optimization.

This package provides a set of nodes for interacting with the KlickTipp API, allowing you to manage subscribers, tags, subscription processes, and more directly from n8n.
For more detailed information on the KlickTipp API, including available functions for managing subscribers, tags, fields, and more, please refer to <a href="https://www.klicktipp.com/de/support/wissensdatenbank/application-programming-interface-api?source=n8n" target="_blank" rel="noopener" title="E-Mail-Marketing API">official KlickTipp API client documentation</a>.

---

## Table of Contents

- [Installation](#installation)
- [Nodes Overview](#nodes-overview)
  - [Opt-in Process](#opt-in-process)
  - [Tags](#tags)
  - [Subscribers](#subscribers)
  - [Data Fields](#data-fields)
  - [Autoresponder](#autoresponder)
- [Credentials](#credentials)
- [Error Handling](#error-handling)
- [License](#license)
- [Example Workflows](#example-workflows)

---

## Installation

To install the package, run the following command in your n8n directory:

```bash
npm install n8n-nodes-klicktipp
```

## Nodes Overview

This package includes nodes to interact with various aspects of the KlickTipp API:

### Opt-in Process

- **Nodes**:
  - `Opt-in Process Index`
  - `Opt-in Process Get`
  - `Opt-in Process Redirect URL`
- **Description**: Manages opt-in processes, including listing all processes, retrieving details of a specific process, and obtaining redirect URLs.

### Tags

- **Nodes**:
  - `Tag Index`
  - `Tag Get`
  - `Tag Create`
  - `Tag Update`
  - `Tag Delete`
- **Description**: Manages tags within KlickTipp, enabling operations to list, create, update, and delete tags.

### Subscribers

- **Nodes**:
  - `Resend Autoresponder`
  - `Subscriber Index`
  - `Subscriber Search`
  - `Subscriber Tagged`
  - `Subscriber Get`
  - `Subscriber Subscribe`
  - `Subscriber Update`
  - `Subscriber Tag`
  - `Subscriber Untag`
  - `Subscriber Unsubscribe`
  - `Subscriber Delete`
  - `Subscriber Sign-In`
  - `Subscriber Sign-Out`
  - `Subscriber Sign-Off`
- **Description**: Provides full management capabilities for subscribers, such as searching, tagging, updating, and deleting subscriber data.

### Data Fields

- **Node**: `Field Index`
- **Description**: Retrieves all available data fields for subscribers.

---

## Credentials

To authenticate with the KlickTipp API, configure your API credentials:

- **Username**
- **Password**
- **API key**

Once set up, these credentials will be used across all KlickTipp nodes in the package.

---

## License

This package is licensed under the MIT License. For details, see the `LICENSE` file.

---

## Example Workflows

Refer to the `examples/n8n-nodes-klicktipp.json` file for sample workflows showcasing the integration.