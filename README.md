# n8n-nodes-klicktipp

**KlickTipp n8n Community Node (npm: `n8n-nodes-klicktipp`)**

**Same project, three surfaces:**
- **npm package:** `n8n-nodes-klicktipp`
- **GitHub repository:** `klicktipp/n8n-community-node-klicktipp`
- **n8n integration page:** https://n8n.io/integrations/klicktipp/

This repository contains the source code for the npm package **`n8n-nodes-klicktipp`**, which powers the official **KlickTipp n8n Community Node** listed on n8n.io.
Note: The GitHub repository name and the npm package name differ. They refer to the same project.

## KlickTipp API Integration for n8n

What is the KlickTipp Marketing Suite?

<a href="https://www.klicktipp.com/de?source=n8n" title="E-Mail-Marketing" target="_blank" rel="noopener noreferrer">KlickTipp Marketing Suite</a> is a digital marketing platform that empowers creators and small businesses to generate leads and turn them into passionate customers. It boosts growth with GDPR-compliant tools for email and SMS marketing, marketing automation, landing pages, and conversion rate optimization.

This package provides a set of nodes for interacting with the KlickTipp API, allowing you to manage contacts, tags, subscription processes, and more directly from n8n.
For more detailed information on the KlickTipp API - covering functions for managing contacts, tags, fields, and more - please refer to the <a href="https://www.klicktipp.com/de/support/wissensdatenbank/application-programming-interface-api?source=n8n" target="_blank" rel="noopener" title="E-Mail-Marketing API">official KlickTipp API client documentation</a> and the <a href="https://www.klicktipp.com/support/knowledge-base/install-klicktipp-node-n8n?source=n8n" target="_blank" rel="noopener" title="Install KlickTipp Node for n8n">installation guide for the KlickTipp node in n8n</a>.

---

## Table of Contents

- [Installation](#installation)
- [Quickstart](#quickstart)
- [Nodes Overview](#nodes-overview)
  - [Contact](#contact)
  - [Contact Tagging](#contact-tagging)
  - [Data Field](#data-field)
  - [Opt-In Process](#opt-in-process)
  - [Tag](#tag)
  - [Triggers](#triggers)
- [Supported Resources and Operations](#supported-resources-and-operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [License](#license)
- [Example Workflows](#example-workflows)
- [Troubleshooting](#troubleshooting)

---

## Installation

To install the package, run the following command in your n8n directory:

```bash
npm install n8n-nodes-klicktipp
```

## Quickstart

1. Install the package in your n8n instance: `npm install n8n-nodes-klicktipp`
2. Restart n8n.
3. In the n8n UI, add **KlickTipp** credentials (username + password).
4. Add a KlickTipp node and choose a resource + operation (for example: Tag -> Create).
5. Execute the workflow.

## Nodes Overview

This package includes nodes to interact with various aspects of the KlickTipp API:

### Contact

- **Nodes**:
  - `Add or update contact`
  - `Delete contact`
  - `Get contact`
  - `Search contact id`
  - `List contacts`
  - `Search tagged contacts`
  - `Unsubscribe contact`
  - `Update contact`
- **Description**: Provides management capabilities for contacts, such as searching, updating, and deleting contact data.

### Contact Tagging

- **Nodes**:
  - `Tag contact`
  - `Untag contact`
- **Description**: Provides management capabilities for contacts tagging.

### Data Field

- **Nodes**:
  - `Get data field`
  - `List data fields`
- **Description**: Manages data fields, including retrieving all available data fields for contacts, and obtaining data field information.

### Opt-In Process

- **Nodes**:
  - `Get Opt-in process`
  - `Search redirect URL`
  - `List Opt-in processes`
- **Description**: Manages opt-in processes, including listing all processes, retrieving details of a specific process, and obtaining redirect URLs.

### Tag

- **Nodes**:
  - `Create tag`
  - `Delete tag`
  - `Get tag`
  - `List tags`
  - `Update tag`
- **Description**: Manages tags within KlickTipp, enabling operations to list, create, update, and delete tags.

### Triggers

- **Node**: `On new KlickTipp event`
- **Description**: Triggers when a webhook event occurs in KlickTipp, such as a tag being added, an email being opened or sent, a link clicked, an SMS sent, and more.

---

## Supported Resources and Operations

Quick inventory (names as displayed in n8n):

**Contact**
- Add or update contact
- Delete contact
- Get contact
- Search contact id
- List contacts
- Search tagged contacts
- Unsubscribe contact
- Update contact

**Contact Tagging**
- Tag contact
- Untag contact

**Data Field**
- Get data field
- List data fields

**Opt-In Process**
- Get Opt-in process
- Search redirect URL
- List Opt-in processes

**Tag**
- Create tag
- Delete tag
- Get tag
- List tags
- Update tag

**Triggers**
- On new KlickTipp event

When building or generating n8n workflows, use the exact operation names above as they appear in the UI.

---

## Workflow Keys (for JSON generation)

For the full, authoritative mapping of `resource` and `operation` keys, see `OPERATIONS.md`.
This is the contract used to generate valid n8n workflow JSON.

---

## Credentials

To authenticate with the KlickTipp API, configure your API credentials:

- **Username**
- **Password**

Once set up, these credentials will be used across all KlickTipp nodes in the package.

---

## Compatibility

- **n8n**: Community nodes (self-hosted or desktop)
- **KlickTipp API**: Uses the official KlickTipp API
- **Authentication**: Username + password

If you are using n8n Cloud, install this community node in a self-hosted or desktop instance.

---

## License

This package is licensed under the MIT License. For details, see the `LICENSE` file.

---

## Example Workflows

Refer to the `examples/n8n-nodes-klicktipp.json` file for sample workflows showcasing the integration.
For the exact resource and operation keys used in workflow JSON, see `OPERATIONS.md`.

---

## Troubleshooting

- **Node not showing up**: Restart n8n after installing `n8n-nodes-klicktipp`.
- **Auth errors**: Verify KlickTipp username/password and that API access is enabled.
- **Operation not found in generated workflows**: Use the exact operation names listed in "Supported Resources and Operations".
