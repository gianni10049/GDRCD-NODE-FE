import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';

export default function ModalBase({ content, title }) {
	const [positions, setPositions] = useState({});
	let modal_width = 600;
	let modal_height = 600;

	useEffect(() => {
		setPositions(getPositions());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getPositions = () => {
		let container = document.getElementById('global_windows'),
			width = container.offsetWidth,
			height = container.offsetHeight;

		return {
			width: width / 2 - modal_width / 2,
			height: height / 2 - modal_height / 2,
		};
	};

	const ModalContent = ({ children }) => {
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
			{positions.width && (
				<Rnd
					bounds={'#root'}
					default={{
						x: positions.width,
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
