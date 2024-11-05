import type {IDataObject, ILoadOptionsFunctions, INodePropertyOptions} from 'n8n-workflow';
import { apiRequest } from '../transport';
import {IResponse} from "../helpers/interfaces";

interface IStaticData {
	allFields?: INodePropertyOptions[];
	[key: string]: any;
}

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
	const staticData = this.getWorkflowStaticData('node') as IStaticData;
	// Load all available fields if not cached
	if (!staticData.allFields) {
		const responseData = await apiRequest.call(this, 'GET', '/field');
		staticData.allFields = Object.entries(responseData).map(([id, name]) => ({
			name: name as string,
			value: id as string,
		}));
	}

	// Get currently selected fields
	const fieldsParameter = this.getNodeParameter('fields', 0, {}) as IDataObject;
	const selectedFields = Array.isArray(fieldsParameter.dataFields)
		? (fieldsParameter.dataFields as IDataObject[])
		: [];

	// Mark already selected options as disabled
	const availableFields = staticData.allFields.map((option: INodePropertyOptions) => {
		if (selectedFields.some((field) => field.fieldId === option.value)) {
			return { ...option, disabled: true };
		}
		return option;
	});

	return availableFields;
}