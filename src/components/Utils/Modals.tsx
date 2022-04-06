import { Box } from '@chakra-ui/react';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import {
	ModalBaseData,
	ModalPositionsData,
	ModelContentData,
} from './Modals.model';

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
				width={modal_width}
				height={modal_height}
				borderWidth={'1px'}
				bg={'green.text'}
				rounded={'xl'}
				borderColor={'green.light'}
				borderStyle={'solid'}
				overflow={'hidden'}
				zIndex={999}>
				<Box
					bg={'green.backgroundDark'}
					borderBottomColor={'green.light'}
					borderBottomStyle={'solid'}
					borderBottomWidth={'1px'}
					py={1}
					fontSize={'xl'}
					w={'full'}
					color={'white'}
					textAlign={'center'}
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
					bounds={'#root'}
					default={{
						x: positions.x,
						y: 55,
						width: modal_width,
						height: modal_height,
					}}>
					<ModalContent>{content}</ModalContent>
				</Rnd>
			)}
		</>
	);
}
