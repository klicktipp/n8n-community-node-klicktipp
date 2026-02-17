# KlickTipp n8n Community Node - Operations Contract

This file is a stable, readable contract of available resources and operations for the npm package `n8n-nodes-klicktipp`.

When building or generating n8n workflows, use the exact operation names below as they appear in the n8n UI and the internal keys listed for JSON generation.

## Node Keys (JSON generation)

**Actions node**
- Node name: `klicktipp`
- Resource values:
  - Contact -> `subscriber`
  - Contact Tagging -> `contact-tagging`
  - Data Field -> `field`
  - Opt-In Process -> `opt-in`
  - Tag -> `tag`

**Trigger node**
- Node name: `klicktippTrigger`
- Required parameter: `path` (string, can be empty for auto-generated)

## Contact (resource: `subscriber`)

- Add or Update Contact -> `subscribe`
- Delete Contact -> `delete`
- Get Contact -> `get`
- List Contacts -> `index`
- Search Contact ID -> `search`
- Search Tagged Contacts -> `tagged`
- Unsubscribe Contact -> `unsubscribe`
- Update Contact -> `update`

## Contact Tagging (resource: `contact-tagging`)

- Tag Contact -> `tag`
- Untag Contact -> `untag`

## Data Field (resource: `field`)

- Get Data Field -> `get`
- List Data Fields -> `index`

## Opt-In Process (resource: `opt-in`)

- Get Opt-in Process -> `get`
- Search Redirect URL -> `getRedirect`
- List Opt-in Processes -> `index`

## Tag (resource: `tag`)

- Create Tag -> `create`
- Delete Tag -> `delete`
- Get Tag -> `get`
- List Tags -> `index`
- Update Tag -> `update`

## Triggers

- On new KlickTipp event (node: `klicktippTrigger`)
