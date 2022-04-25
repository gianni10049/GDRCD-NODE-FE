import { availableFonts, textAlign } from './Generic.model';

export interface PopoverData {
	title: string;
	titleFont?: availableFonts;
	titleSize?: number;
	titleColor?: string;
	content: string;
	contentFont?: availableFonts;
	contentAlign?: textAlign;
	contentSize?: number;
	widthSize?: string;
	heightSize?: string;
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
