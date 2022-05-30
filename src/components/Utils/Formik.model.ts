export interface fieldData {
	name: string;
	type?: string | 'text' | 'password' | 'number' | 'select';
	placeholder?: string;
	fields?: any;
	fieldValue?: string;
	fieldLabel?: any;
	width?: string;
}
export interface submitData {
	label?: string;
}

export interface renderSelectInput {
	value: string;
	label: string;
	data: [object];
	placeholder?: string;
}
