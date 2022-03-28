import { Box, Flex, Icon, Link } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import Logo from '../Utils/logo';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';

import { useState } from 'react';

const NavLink = ({ children, link, icon, hovered, onClick }) => {
	return (
		<Link
			as={ReachLink}
			onClick={onClick}
			to={link}
			color={'green.border'}
			py={2}
			px={4}
			my={2}
			d={'block'}
			_hover={{
				bg: 'green.border',
				color: 'green.light',
			}}
			outline={'none'}
			_active={{
				color: 'white',
				boxShadow: 'none',
				outline: 'none',
			}}>
			<Flex alignItems={'center'}>
				<Icon as={icon} boxSize={8} d={'inline-block'} />
				<Box
					maxW={hovered ? '500px' : '0px'}
					d={'inline-block'}
					className={'ct-animate-slow'}
					overflow={'hidden'}>
					<Box
						ml={2}
						d={'inline-block'}
						className={'font-TecFont tracking-wider'}>
						{children}
					</Box>
				</Box>
			</Flex>
		</Link>
	);
};

const Header = () => {
	const [hovered, setHover] = useState(false);
	const [subMenu, setSubMenu] = useState(false);

	return (
		<Box
			bg={'green.backgroundDark'}
			pos={'fixed'}
			left={0}
			top={0}
			minH={'100vh'}
			zIndex={1}>
			<Flex>
				<Box
					height={'100vh'}
					onPointerOver={() => setHover(true)}
					onPointerOut={() => {
						if (!subMenu) {
							setHover(false);
						}
					}}>
					{/*Links*/}
					<Box w={'50px'} mt={8} mb={3} mx={3}>
						<Logo />
					</Box>
					<Box d={'block'}>
						<NavLink
							link={'#'}
							icon={FaUserAlt}
							hovered={hovered}
							onClick={() => {
								subMenu === false || subMenu !== 'user'
									? setSubMenu('user')
									: setSubMenu(false);
							}}>
							User
						</NavLink>

						<NavLink
							link={'#'}
							icon={AiFillMessage}
							hovered={hovered}
							onClick={() => {
								subMenu === false || subMenu !== 'messages'
									? setSubMenu('messages')
									: setSubMenu(false);
								console.log(subMenu);
							}}>
							Messages
						</NavLink>
					</Box>
				</Box>
				<Box
					height={'100vh'}
					zIndex={1}
					onPointerOut={() => {
						setHover(false);
					}}>
					<Box
						color={'silver'}
						pos={'fixed'}
						minH={'100vh'}
						borderLeft={'1px solid silver'}
						zIndex={2}
						p={3}
						bg={'green.backgroundDark'}
						className={'ct-animate-slowest'}
						d={subMenu === 'user' ? 'block' : 'none'}>
						USER MENU
					</Box>
					<Box
						color={'silver'}
						minH={'100vh'}
						borderLeft={'1px solid silver'}
						p={3}
						zIndex={2}
						bg={'green.backgroundDark'}
						className={'ct-animate-slowest '}
						d={subMenu === 'messages' ? 'block' : 'none'}>
						MESSAGES MENU
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default Header;
