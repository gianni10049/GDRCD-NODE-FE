import { Box, Flex, Icon, Link, Text, Tooltip } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import Logo from '../Utils/logo';
import {
	menuVoiceInterface,
	navLinkInterface,
	subMenuVoiceInterface,
} from './Header.model';
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
import { useModalContext } from '../Utils/ModalsContext';
import React from 'react';

const NavLink = (props: navLinkInterface) => {
	return (
		<Tooltip
			hasArrow
			label={props.label}
			bg={'green.light'}
			color={'green.text'}
			fontSize={'md'}
			placement={'left'}
			fontFamily={'TecFont'}
			letterSpacing={'widest'}
			fontWeight={'extrabold'}>
			<Link
				to={'#'}
				as={ReachLink}
				onClick={props.onClick}
				color={'green.textLight'}
				bg={props.current_url ? 'green.light' : 'transparent'}
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
						as={props.icon}
						boxSize={8}
						d={'inline-block'}
						m={props.hovered ? 'none' : 'auto'}
					/>
					<Box
						maxW={props.hovered ? '500px' : '0px'}
						d={'inline-block'}
						overflow={'hidden'}>
						<Box
							ml={2}
							d={'inline-block'}
							className={'font-TecFont tracking-wider'}
						/>
					</Box>
				</Flex>
			</Link>
		</Tooltip>
	);
};

const MenuVoice = (props: menuVoiceInterface) => {
	return (
		<Box
			color={'green.textLight'}
			cursor={'pointer'}
			py={3}
			pr={3}
			onClick={props.onClick}
			_hover={{
				bg: 'green.border',
				color: 'white',
			}}>
			<Icon as={props.icon} d={'inline-block'} boxSize={6} ml={6} />
			<Text
				fontSize={'md'}
				verticalAlign={'middle'}
				fontFamily={'TecFont'}
				ml={3}
				d={'inline-block'}>
				{props.buttonText}
			</Text>
		</Box>
	);
};

const SubMenu = (props: subMenuVoiceInterface) => {
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
			d={props.actualSubMenu === props.menuOpenedOn ? 'block' : 'none'}>
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
				{props.title}
			</Text>

			{props.children}
		</Box>
	);
};

const Header = () => {
	const [hovered, setHover] = useState<boolean>(false);
	const [subMenu, setSubMenu] = useState<string>('');

	let { modalState, setModalState } = useModalContext();

	return (
		<Box
			bg={'green.backgroundDark'}
			pos={'fixed'}
			left={0}
			top={0}
			minH={'100vh'}
			zIndex={100}>
			<Flex>
				<Box height={'100vh'}>
					{/*Links*/}
					<Box w={'50px'} mt={8} mb={3} mx={3}>
						<Logo />
					</Box>
					<Box d={'block'}>
						<NavLink
							icon={GiWorld}
							label={'Map'}
							hovered={hovered}
							current_url={subMenu === 'map'}
							onClick={() => {
								subMenu === '' || subMenu !== 'map'
									? setSubMenu('map')
									: setSubMenu('');
							}}
						/>

						<NavLink
							icon={FaUserAlt}
							hovered={hovered}
							current_url={subMenu === 'user'}
							label={'User'}
							onClick={() => {
								subMenu === '' || subMenu !== 'user'
									? setSubMenu('user')
									: setSubMenu('');
							}}
						/>

						<NavLink
							icon={AiFillMessage}
							label={'Messages'}
							hovered={hovered}
							current_url={subMenu === 'messages'}
							onClick={() => {
								subMenu === '' || subMenu !== 'messages'
									? setSubMenu('messages')
									: setSubMenu('');
							}}
						/>

						<NavLink
							icon={MdOutlineAttachMoney}
							hovered={hovered}
							current_url={subMenu === 'market'}
							label={'Market'}
							onClick={() => {
								subMenu === '' || subMenu !== 'market'
									? setSubMenu('market')
									: setSubMenu('');
							}}
						/>

						<NavLink
							icon={FaCampground}
							hovered={hovered}
							current_url={subMenu === 'camps'}
							label={'Camps'}
							onClick={() => {
								subMenu === '' || subMenu !== 'camps'
									? setSubMenu('camps')
									: setSubMenu('');
							}}
						/>

						<NavLink
							icon={SiGooglechat}
							hovered={hovered}
							label={'Chat'}
							current_url={subMenu === 'chat'}
							onClick={() => {
								subMenu === '' || subMenu !== 'chat'
									? setSubMenu('chat')
									: setSubMenu('');
							}}
						/>

						<NavLink
							icon={HiUserGroup}
							hovered={hovered}
							current_url={subMenu === 'groups'}
							label={'Groups'}
							onClick={() => {
								subMenu === '' || subMenu !== 'groups'
									? setSubMenu('groups')
									: setSubMenu('');
							}}
						/>
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
						<MenuVoice icon={FaMap} buttonText={'Full Map'} />
						<MenuVoice
							icon={BsFillPinMapFill}
							buttonText={'Fast Map'}
						/>
						<MenuVoice
							icon={GiPathDistance}
							buttonText={'Calc Distance'}
						/>
						<MenuVoice
							icon={MdEmojiPeople}
							buttonText={'Presences'}
						/>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'user'}
						title={'USER'}>
						<MenuVoice
							icon={ImProfile}
							buttonText={'Profile'}
							onClick={() => {
								setModalState({
									character_page: {
										open: !modalState.character_page.open,
									},
								});
							}}
						/>
						<MenuVoice
							icon={FaBox}
							buttonText={'Resources'}
							onClick={() => {
								setModalState({
									character_resources: {
										open: !modalState.character_resources
											.open,
									},
								});
							}}
						/>
						<MenuVoice
							icon={CgArrowsExchangeAlt}
							buttonText={'Change Character'}
							onClick={() => {
								window.location.href = '/charSelect';
							}}
						/>
						<MenuVoice icon={HiLogout} buttonText={'Logout'} />
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'messages'}
						title={'MESSAGES'}>
						<MenuVoice
							icon={FaEnvelopeOpenText}
							buttonText={'Personal'}
						/>
						<MenuVoice icon={GoRadioTower} buttonText={'Radio'} />
						<MenuVoice icon={FaEdit} buttonText={'Forum'} />
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						title={'MARKET'}
						menuOpenedOn={'market'}>
						<MenuVoice icon={GiTakeMyMoney} buttonText={'Buy'} />
						<MenuVoice icon={GiReceiveMoney} buttonText={'Sell'} />
						<MenuVoice icon={FaHandshake} buttonText={'Exchange'} />
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'camps'}
						title={'CAMPS'}>
						<MenuVoice icon={FaClipboardList} buttonText={'List'} />
						<MenuVoice icon={FaWrench} buttonText={'Edit'} />
						<MenuVoice
							icon={BiCoinStack}
							buttonText={'Resources'}
						/>
						<MenuVoice
							icon={FaWarehouse}
							buttonText={'Warehouses'}
						/>
						<MenuVoice icon={FaUserShield} buttonText={'Troops'} />
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'chat'}
						title={'CHAT'}>
						<MenuVoice
							icon={BsFillInfoCircleFill}
							buttonText={'Info Chat'}
						/>
						<MenuVoice icon={ImFlag} buttonText={'Factions'} />
						<MenuVoice icon={MdOutlinePeople} buttonText={'PNG'} />
						<MenuVoice icon={SiRoamresearch} buttonText={'Hunt'} />
						<MenuVoice icon={RiStarFill} buttonText={'Events'} />
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'groups'}
						title={'Groups'}>
						<MenuVoice
							icon={AiOutlineUnorderedList}
							buttonText={'List'}
						/>
					</SubMenu>
				</Box>
			</Flex>
		</Box>
	);
};

export default Header;
