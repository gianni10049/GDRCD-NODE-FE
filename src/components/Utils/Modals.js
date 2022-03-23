import { Button, Box } from '@chakra-ui/react';
import { useState } from 'react';
import Logo from './logo';
import { Rnd } from 'react-rnd';
import Page404 from '../404/404';

export default function ModalBase({ kind }) {
	const [data, setData] = useState(<></>);
	const [isOpen, setIsOpen] = useState(false);

	const loadData = () => {
		switch (kind) {
			case 'user':
				setData(<Logo />);
				break;
			default:
				setData(<Page404 code={'404'} />);
				break;
		}
	};

	const setOpen = () => {
		if (isOpen) {
			setData(<></>);
		} else {
			loadData();
		}

		setIsOpen(!isOpen);
	};

	return (
		<>
			<Button onClick={setOpen}>Open Modal</Button>

			<Rnd
				bounds={'#global_windows'}
				style={{
					pointerEvents: isOpen ? 'all' : 'none',
				}}
				default={{
					x: 0,
					y: 0,
				}}>
				<Box
					d={isOpen ? 'block' : 'none'}
					width={'600px'}
					height={'600px'}
					overflowY={'scroll'}
					zIndex={999}
					bg={'red'}
					color={'white'}>
					<Box id={'ModalContent'}>{data}</Box>
				</Box>
			</Rnd>
		</>
	);
}
