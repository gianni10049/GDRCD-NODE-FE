import { availableFonts, textAlign } from './Generic.model';

export interface PopoverData {
	title: string;
	titleFont?: availableFonts;
	titleSize?: number;
	content: string;
	contentFont?: availableFonts;
	contentAlign?: textAlign;
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
	buttonFont?: availableFonts;
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
