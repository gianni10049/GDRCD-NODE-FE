import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import Logo from '../Utils/logo';
import {
	FaUserAlt,
	FaBox,
	FaEnvelopeOpenText,
	FaEdit,
	FaHandshake,
	FaMap,
	FaCampground,
	FaClipboardList,
	FaWrench,
	FaWarehouse,
	FaUserShield,
} from 'react-icons/fa';
import { AiFillMessage, AiOutlineUnorderedList } from 'react-icons/ai';
import { ImProfile, ImFlag } from 'react-icons/im';
import { CgArrowsExchangeAlt } from 'react-icons/cg';
import { HiLogout, HiUserGroup } from 'react-icons/hi';
import { RiStarFill } from 'react-icons/ri';
import { GoRadioTower } from 'react-icons/go';
import {
	MdOutlineAttachMoney,
	MdEmojiPeople,
	MdOutlinePeople,
} from 'react-icons/md';
import {
	GiReceiveMoney,
	GiTakeMyMoney,
	GiWorld,
	GiPathDistance,
} from 'react-icons/gi';
import { BsFillPinMapFill, BsFillInfoCircleFill } from 'react-icons/bs';
import { BiCoinStack } from 'react-icons/bi';
import { SiGooglechat, SiRoamresearch } from 'react-icons/si';

import { useState } from 'react';

const NavLink = ({ children, icon, hovered, onClick, current_url }) => {
	return (
		<Link
			to={'#'}
			as={ReachLink}
			onClick={onClick}
			color={'green.textLight'}
			bg={current_url ? 'green.light' : 'transparent'}
			py={2}
			px={2}
			w={'full'}
			d={'block'}
			_hover={{
				bg: 'green.border',
				color: 'white',
			}}>
			<Flex alignItems={'center'} className={'ct-animate-fast'}>
				<Icon
					as={icon}
					boxSize={8}
					d={'inline-block'}
					m={hovered ? 'none' : 'auto'}
				/>
				<Box
					maxW={hovered ? '500px' : '0px'}
					d={'inline-block'}
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

const MenuVoice = ({ children, icon }) => {
	return (
		<Box
			color={'green.textLight'}
			cursor={'pointer'}
			py={3}
			pr={3}
			_hover={{
				bg: 'green.border',
				color: 'white',
			}}>
			<Icon as={icon} d={'inline-block'} boxSize={6} ml={6} />
			<Text
				fontSize={'md'}
				verticalAlign={'middle'}
				fontFamily={'TecFont'}
				ml={3}
				d={'inline-block'}>
				{children}
			</Text>
		</Box>
	);
};

const SubMenu = ({ children, actualSubMenu, menuOpenedOn, title }) => {
	return (
		<Box
			color={'silver'}
			pos={'fixed'}
			minH={'100vh'}
			borderLeftWidth={'1px'}
			borderLeftColor={'green.light'}
			borderLeftStyle={'solid'}
			zIndex={2}
			pt={3}
			bg={'green.backgroundDark'}
			className={'ct-animate-slowest'}
			d={actualSubMenu === menuOpenedOn ? 'block' : 'none'}>
			<Text
				fontSize={'2xl'}
				my={3}
				mx={6}
				fontFamily={'TecFont'}
				color={'green.text'}
				_hover={{
					color: 'green.border',
				}}
				letterSpacing={'wider'}
				textAlign={'center'}
				cursor={'default'}
				className={'text-border'}>
				{title}
			</Text>

			{children}
		</Box>
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
							icon={GiWorld}
							hovered={hovered}
							current_url={subMenu === 'map'}
							onClick={() => {
								subMenu === false || subMenu !== 'map'
									? setSubMenu('map')
									: setSubMenu(false);
							}}>
							Map
						</NavLink>

						<NavLink
							icon={FaUserAlt}
							hovered={hovered}
							current_url={subMenu === 'user'}
							onClick={() => {
								subMenu === false || subMenu !== 'user'
									? setSubMenu('user')
									: setSubMenu(false);
							}}>
							User
						</NavLink>

						<NavLink
							icon={AiFillMessage}
							hovered={hovered}
							current_url={subMenu === 'messages'}
							onClick={() => {
								subMenu === false || subMenu !== 'messages'
									? setSubMenu('messages')
									: setSubMenu(false);
							}}>
							Messages
						</NavLink>

						<NavLink
							icon={MdOutlineAttachMoney}
							hovered={hovered}
							current_url={subMenu === 'market'}
							onClick={() => {
								subMenu === false || subMenu !== 'market'
									? setSubMenu('market')
									: setSubMenu(false);
							}}>
							Market
						</NavLink>

						<NavLink
							icon={FaCampground}
							hovered={hovered}
							current_url={subMenu === 'camps'}
							onClick={() => {
								subMenu === false || subMenu !== 'camps'
									? setSubMenu('camps')
									: setSubMenu(false);
							}}>
							Camps
						</NavLink>

						<NavLink
							icon={SiGooglechat}
							hovered={hovered}
							current_url={subMenu === 'chat'}
							onClick={() => {
								subMenu === false || subMenu !== 'chat'
									? setSubMenu('chat')
									: setSubMenu(false);
							}}>
							Chat
						</NavLink>

						<NavLink
							icon={HiUserGroup}
							hovered={hovered}
							current_url={subMenu === 'groups'}
							onClick={() => {
								subMenu === false || subMenu !== 'groups'
									? setSubMenu('groups')
									: setSubMenu(false);
							}}>
							Groups
						</NavLink>
					</Box>
				</Box>

				<Box
					height={'100vh'}
					zIndex={1}
					onPointerOut={() => {
						setHover(false);
					}}>
					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'map'}
						title={'MAP'}>
						<MenuVoice icon={FaMap}>Full Map</MenuVoice>
						<MenuVoice icon={BsFillPinMapFill}>Fast Map</MenuVoice>
						<MenuVoice icon={GiPathDistance}>
							Calc Distance
						</MenuVoice>
						<MenuVoice icon={MdEmojiPeople}>Presences</MenuVoice>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'user'}
						title={'USER'}>
						<MenuVoice icon={ImProfile}>Profile</MenuVoice>
						<MenuVoice icon={FaBox}>Resources</MenuVoice>
						<MenuVoice icon={CgArrowsExchangeAlt}>
							Change Character
						</MenuVoice>
						<MenuVoice icon={HiLogout}>Logout</MenuVoice>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'messages'}
						title={'MESSAGES'}>
						<MenuVoice icon={FaEnvelopeOpenText}>
							Personal
						</MenuVoice>
						<MenuVoice icon={GoRadioTower}>Radio</MenuVoice>
						<MenuVoice icon={FaEdit}>Forum</MenuVoice>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						title={'MARKET'}
						menuOpenedOn={'market'}>
						<MenuVoice icon={GiTakeMyMoney}>Buy</MenuVoice>
						<MenuVoice icon={GiReceiveMoney}>Sell</MenuVoice>
						<MenuVoice icon={FaHandshake}>Exchange</MenuVoice>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'camps'}
						title={'CAMPS'}>
						<MenuVoice icon={FaClipboardList}> List</MenuVoice>
						<MenuVoice icon={FaWrench}>Edit </MenuVoice>
						<MenuVoice icon={BiCoinStack}>Resources</MenuVoice>
						<MenuVoice icon={FaWarehouse}>Warehouses</MenuVoice>
						<MenuVoice icon={FaUserShield}>Troops</MenuVoice>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'chat'}
						title={'CHAT'}>
						<MenuVoice icon={BsFillInfoCircleFill}>
							Info Chat
						</MenuVoice>
						<MenuVoice icon={ImFlag}>Factions </MenuVoice>
						<MenuVoice icon={MdOutlinePeople}>PNG</MenuVoice>
						<MenuVoice icon={SiRoamresearch}>Hunt</MenuVoice>
						<MenuVoice icon={RiStarFill}>Events</MenuVoice>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'groups'}
						title={'Groups'}>
						<MenuVoice icon={AiOutlineUnorderedList}>
							List
						</MenuVoice>
					</SubMenu>
				</Box>
			</Flex>
		</Box>
	);
};

export default Header;
