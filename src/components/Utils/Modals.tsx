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
import modalsContent from '../../constants/modals';

export default function ModalBase(props: ModalBaseData) {
	let { options, component, title } = props;

	let Content, ModalComponent;

	if (modalsContent[component]) {
		ModalComponent = modalsContent[component];
		Content = <ModalComponent options={options} />;
	} else {
		ModalComponent = modalsContent['Page404'];
		Content = <ModalComponent code={404} />;
	}

	const [positions, setPositions] = useState<ModalPositionsData>({});
	let modal_width = 720;
	let modal_height = 580;
	let max_width = 1500;
	let max_height = 1000;

	const getPositions = useCallback<any>(() => {
		let width = window.innerWidth,
			height = window.innerHeight;

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
					{title}
					<Box
						pos={'absolute'}
						right={5}
						top={0}
						color={'red'}
						cursor={'pointer'}
						onClick={() => {}}>
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
					maxHeight={max_height}
					maxWidth={max_width}
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
						x: positions.x > 0 ? positions.x : 0,
						y: positions.y > 0 ? positions.y : 0,
						width: modal_width,
						height: modal_height,
					}}>
					<ModalContent>{Content}</ModalContent>
				</Rnd>
			)}
		</>
	);
}
