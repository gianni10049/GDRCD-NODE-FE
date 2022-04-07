import { Box } from '@chakra-ui/react';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import {
	ModalBaseData,
	ModalPositionsData,
	ModelContentData,
} from './Modals.model';
import $ from 'jquery';

export default function ModalBase(props: ModalBaseData) {
	let { content, title } = props;

	const [positions, setPositions] = useState<ModalPositionsData>({});
	let modal_width = 600;
	let modal_height = 600;

	const getPositions = useCallback<any>(() => {
		let container = document.getElementById('root'),
			width = container.offsetWidth,
			height = container.offsetHeight;

		return {
			x: width / 2 - modal_width / 2,
			y: height / 2 - modal_height / 2,
		};
	}, [modal_width, modal_height]);

	useEffect(() => {
		setPositions(getPositions());
	}, [getPositions]);

	const ModalContent = (props: ModelContentData) => {
		let { children } = props;

		return (
			<Box
				width={'full'}
				height={'full'}
				borderWidth={'1px'}
				bg={'green.text'}
				rounded={'xl'}
				borderColor={'green.light'}
				borderStyle={'solid'}
				overflow={'hidden'}
				zIndex={999}>
				<Box
					className={'drag-window'}
					bg={'green.backgroundDark'}
					borderBottomColor={'green.light'}
					borderBottomStyle={'solid'}
					borderBottomWidth={'1px'}
					py={1}
					fontSize={'xl'}
					w={'full'}
					color={'white'}
					textAlign={'center'}
					cursor={'move'}
					fontFamily={'TecFont'}>
					{title}
				</Box>
				<Box p={2} overflow={'auto'}>
					{children}
				</Box>
			</Box>
		);
	};

	return (
		<>
			{positions.x && (
				<Rnd
					dragHandleClassName={'drag-window'}
					onDragStart={(e) => {
						$('.react-draggable').css('z-index', 50);

						$(e.target)
							.closest('.react-draggable')
							.css('z-index', '99');
					}}
					bounds={'#root'}
					enableResizing={{
						top: false,
						right: false,
						bottom: false,
						left: false,
						topRight: false,
						bottomRight: true,
						bottomLeft: true,
						topLeft: false,
					}}
					default={{
						x: positions.x,
						y: positions.y,
						width: modal_width,
						height: modal_height,
					}}>
					<ModalContent>{content}</ModalContent>
				</Rnd>
			)}
		</>
	);
}
