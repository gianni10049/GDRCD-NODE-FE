import {
	PopoverArrow,
	PopoverContent,
	Popover,
	PopoverHeader,
	PopoverTrigger,
	PopoverCloseButton,
	PopoverBody,
	Icon,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { PopoverData } from './Popover.model';
import { BsFillInfoCircleFill } from 'react-icons/bs';

export const PopoverCustom = (props: PopoverData) => {
	return (
		<Popover placement={props.placement ?? 'bottom'}>
			<PopoverTrigger>
				<Text
					cursor={'pointer'}
					color={props.buttonTextColor ?? ''}
					_hover={{
						color: props.buttonTextColorHover ?? '',
					}}
					fontFamily={props.buttonFont ?? 'PaintFont'}
					fontSize={props.buttonTextSize ?? 18}
					h={'full'}
					className={props.buttonClassName ?? ''}
					px={2}>
					{props.buttonText}
					{props.buttonTextIcon && (
						<Icon
							as={props.buttonTextIcon}
							boxSize={props.buttonTextIconSize ?? 6}
							ml={1}
						/>
					)}
				</Text>
			</PopoverTrigger>
			<PopoverContent
				w={props.widthSize ?? 'xs'}
				h={props.heightSize ?? 'auto'}
				maxWidth={props.widthSize ?? 'sm'}
				maxHeight={props.heightSize ?? 'sm'}
				boxShadow={'0 0 15px 4px rgba(0, 0, 0, 0.8) !important'}
				bg={'green.backgroundDark'}
				borderColor='green.light'
				borderWidth={'1px'}
				borderStyle={'solid'}>
				<PopoverArrow bg={'green.backgroundDark'} />
				<PopoverCloseButton color={'red'} fontWeight={'bold'} />
				<PopoverHeader
					textAlign={'center'}
					borderColor={'green.light'}
					fontSize={props.titleSize ?? 18}
					color={props.titleColor ?? 'green.textLight'}
					fontFamily={props.titleFont ?? 'TecFont'}>
					{props.title}
				</PopoverHeader>
				<PopoverBody
					overflow={'auto'}
					whiteSpace={'pre-wrap'}
					color={'white'}
					fontSize={props.contentSize ?? 18}
					fontFamily={props.contentFont ?? 'LightText'}
					textAlign={props.contentAlign ?? 'center'}>
					{props.content}
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};

export const PopoverInfo = (props: PopoverData) => {
	return (
		<PopoverCustom
			title={props.title}
			titleFont={props.titleFont}
			titleSize={props.titleSize}
			titleColor={props.titleColor}
			content={props.content}
			contentFont={props.contentFont}
			contentAlign={props.contentAlign}
			contentSize={props.contentSize}
			widthSize={props.widthSize}
			heightSize={props.heightSize}
			buttonClassName={props.buttonClassName}
			buttonText={props.buttonText}
			buttonTextSize={props.buttonTextSize ?? 15}
			buttonTextColor={props.buttonTextColor ?? 'popover.info'}
			buttonTextColorHover={props.buttonTextColorHover ?? 'green.light'}
			buttonTextIcon={props.buttonTextIcon ?? BsFillInfoCircleFill}
			buttonTextIconSize={props.buttonTextIconSize ?? 4}
			buttonTextIconColor={props.buttonTextIconColor}
			buttonFont={props.buttonFont ?? 'Ariel'}
			placement={props.placement}
		/>
	);
};
