export interface fieldData {
	name: string;
	type?: string | 'text' | 'password' | 'number' | 'select';
	placeholder?: string;
	textAlign?: 'left' | 'center' | 'right';
	fields?: any;
	fieldValue?: string;
	fieldLabel?: any;
}
export interface submitData {
	label?: string;
}

export interface renderSelectInput {
	value: string;
	label: string;
	data: [object];
}
