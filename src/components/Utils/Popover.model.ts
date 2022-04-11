export interface PopoverData {
	title: string;
	content: string;
	widthSize?: string;
	heightSize?: string;
	contentSize?: number;
	buttonClassName?: string;
	buttonText?: string;
	buttonTextSize?: number;
	buttonTextColor?: string;
	buttonTextColorHover?: string;
	buttonTextIcon?: any;
	buttonTextIconSize?: number;
	buttonTextIconColor?: string;
	buttonTextFamily?: string;
	placement?:
		| 'start-start'
		| 'start-end'
		| 'end-start'
		| 'end-end'
		| 'start'
		| 'end'
		| 'top'
		| 'bottom'
		| 'left'
		| 'right';
}
