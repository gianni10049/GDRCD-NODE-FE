import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import Logo from '../Utils/logo';
import { FaUserAlt } from 'react-icons/fa';
import { FaMap } from 'react-icons/fa';
import { FaWpforms } from 'react-icons/fa';
import { useState } from 'react';

const NavLink = ({ children, link, icon, hovered }) => {
	return (
		<Link
			as={ReachLink}
			to={link}
			color='gray.500'
			py={2}
			px={4}
			my={2}
			d={'block'}
			_hover={{
				bg: 'transparent',
				color: 'white',
			}}
			_active={{
				color: 'white',
			}}>
			<Flex alignItems={'center'}>
				<Icon as={icon} boxSize={8} d={'inline-block'} />
				<Box
					maxW={hovered ? '500px' : '0px'}
					d={'inline-block'}
					className={'ct-animate-slow'}
					overflow={'hidden'}>
					<Text ml={2} d={'inline-block'}>
						{children}
					</Text>
				</Box>
			</Flex>
		</Link>
	);
};

const Header = () => {
	const [hovered, setHover] = useState(false);

	return (
		<>
			<Box
				bg={'gray.800'}
				pos={'fixed'}
				left={0}
				top={0}
				minH={'100vh'}
				zIndex={1}
				onPointerOver={() => setHover(true)}
				onPointerOut={() => setHover(false)}>
				{/*Links*/}
				<Box w={'50px'} mt={8} mb={3} mx={3}>
					<Logo />
				</Box>
				<Box d={'block'}>
					<NavLink link={'/home'} icon={FaUserAlt} hovered={hovered}>
						home
					</NavLink>
					<NavLink link={'/about'} icon={FaMap} hovered={hovered}>
						about
					</NavLink>
					<NavLink
						link={'/contact'}
						icon={FaWpforms}
						hovered={hovered}>
						contact
					</NavLink>
				</Box>
			</Box>
		</>
	);
};

export default Header;
