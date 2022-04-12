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
					fontFamily={props.buttonTextFamily ?? 'PaintFont'}
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
				fontFamily={'TecFont'}
				bg={'green.backgroundDark'}
				borderColor='green.light'
				borderWidth={'1px'}
				borderStyle={'solid'}>
				<PopoverArrow bg={'green.backgroundDark'} />
				<PopoverCloseButton color={'red'} fontWeight={'bold'} />
				<PopoverHeader textAlign={'center'} borderColor={'green.light'}>
					{props.title}
				</PopoverHeader>
				<PopoverBody
					overflow={'auto'}
					whiteSpace={'pre-wrap'}
					color={'white'}
					fontSize={props.contentSize ?? 15}
					textAlign={'center'}>
					{props.content}
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};

export const PopoverInfo = (props: PopoverData) => {
	return (
		<PopoverCustom
			buttonClassName={props.buttonClassName ?? ''}
			title={props.title}
			content={props.content}
			buttonTextIcon={props.buttonTextIcon ?? BsFillInfoCircleFill}
			buttonTextSize={props.buttonTextSize ?? 15}
			buttonTextFamily={props.buttonTextFamily ?? 'Ariel'}
			buttonTextIconSize={props.buttonTextIconSize ?? 4}
			buttonTextColorHover={props.buttonTextColorHover ?? 'green.light'}
			widthSize={props.widthSize}
			heightSize={props.heightSize}
		/>
	);
};
