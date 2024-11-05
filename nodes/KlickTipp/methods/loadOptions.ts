import type {ILoadOptionsFunctions, INodePropertyOptions} from 'n8n-workflow';
import { apiRequest } from '../transport';
import {IResponse} from "../helpers/interfaces";

export async function getTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await apiRequest.call(this, 'GET', '/tag');

	if (typeof responseData !== 'object' || responseData === null) {
		throw new Error('Unexpected response format');
	}

	const tags: INodePropertyOptions[] = Object.entries(responseData as IResponse).map(
		([id, name]) => {
			return {
				name: name,
				value: id,
			};
		}
	);

	// Add a placeholder option at the beginning
	tags.unshift({
		name: 'Please select a tag',
		value: '',
	});

	return tags;
}

export async function getOptInProcesses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData = await apiRequest.call(this, 'GET', '/list');

	if (typeof responseData !== 'object' || responseData === null) {
		throw new Error('Unexpected response format');
	}

	const processes: INodePropertyOptions[] = Object.entries(responseData as IResponse).map(
		([id, name]) => {
			const processName = name ? name : 'Predefined double opt-in process';

			return {
				name: processName,
				value: id,
			};
		}
	);

	// Add a placeholder option at the beginning
	processes.unshift({
		name: 'Please select the opt-in process',
		value: '',
	});

	return processes;
}

export async function getFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	// Fetch fields from the API
	const responseData = await apiRequest.call(this, 'GET', '/field');

	// Check for an unexpected response format
	if (typeof responseData !== 'object' || responseData === null) {
		throw new Error('Unexpected response format');
	}

	const fields: INodePropertyOptions[] = Object.entries(responseData as IResponse).map(
		([id, name]) => {
			return {
				name: name,
				value: id,
			};
		}
	);

	return fields;
}