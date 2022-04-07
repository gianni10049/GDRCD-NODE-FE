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
import { useModalContext } from './ModalsContext';

export default function ModalBase(props: ModalBaseData) {
	let { modalStateVar } = props;
	let { modalState, setModalState } = useModalContext();

	const [positions, setPositions] = useState<ModalPositionsData>({});
	let modal_width = 720;
	let modal_height = 580;

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

		console.log(modalState[modalStateVar]);

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
					pos={'relative'}
					className={'drag-window'}
					bg={'green.backgroundDark'}
					borderBottomColor={'green.light'}
					borderBottomStyle={'solid'}
					borderBottomWidth={'1px'}
					py={1}
					fontSize={'xl'}
					w={'full'}
					h={'40px'}
					color={'white'}
					textAlign={'center'}
					cursor={'move'}
					fontFamily={'TecFont'}>
					{modalState[modalStateVar].title}
					<Box
						pos={'absolute'}
						right={5}
						top={0}
						color={'red'}
						cursor={'pointer'}
						onClick={() => {
							modalState[modalStateVar].open = false;
							setModalState(modalState);
						}}>
						X
					</Box>
				</Box>
				<Box p={2} h={'calc(100% - 40px)'} overflow={'auto'}>
					{children}
				</Box>
			</Box>
		);
	};

	return (
		<>
			{positions.x && (
				<Rnd
					minHeight={modal_height}
					minWidth={modal_width}
					maxHeight={'97vh'}
					maxWidth={'97vw'}
					dragHandleClassName={'drag-window'}
					onDragStart={(e) => {
						$('.react-draggable').css('z-index', 50);

						$(e.target)
							.closest('.react-draggable')
							.css('z-index', '99');
					}}
					bounds={'#root'}
					enableResizing={true}
					default={{
						x: positions.x,
						y: positions.y,
						width: modal_width,
						height: modal_height,
					}}>
					<ModalContent>
						{modalState[modalStateVar].component}
					</ModalContent>
				</Rnd>
			)}
		</>
	);
}
