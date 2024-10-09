# n8n-community-node-klicktipp

This is an n8n community node that integrates KlickTipp with n8n workflows, enabling you to manage subscribers, tags, subscription processes, and more directly from n8n.

KlickTipp is a powerful email marketing platform designed for managing subscriber lists, sending campaigns, and creating complex automation workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

---

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation to install the `n8n-community-node-klicktipp`.

---

## Operations

This node provides several operations to interact with KlickTipp. Below is a list of the available operations:

- **Login:** Log into the KlickTipp API.
- **Logout:** Log out of the KlickTipp API.
- **Subscription Process Nodes:**
    - Fetch available subscription processes.
    - Retrieve specific subscription process by ID.
    - Retrieve redirection URL for a given subscription process.
- **Tag Nodes:**
    - Create, update, delete tags.
    - Tag and untag subscribers using their email.
- **Subscriber Nodes:**
    - Subscribe, unsubscribe, search, update, and delete subscribers.
    - Resend autoresponders to subscribers.
- **Field Index Node:** Retrieve available contact fields for subscribers, such as first name, last name, and email.

---

## Compatibility

This node requires n8n version `0.201.0` or higher.

---

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [KlickTipp API documentation](https://www.klicktipp.com/de/support/wissensdatenbank/application-programming-interface-api/)

---

## Version History

- **1.0.0:** Initial release.
