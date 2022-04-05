import { Box, Flex, Icon, Link, Text, Tooltip } from '@chakra-ui/react';
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
import { useModalContext } from '../Utils/ModalsContext';

const NavLink = ({ children, icon, hovered, onClick, current_url, label }) => {
	return (
		<Tooltip
			hasArrow
			label={label}
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
		</Tooltip>
	);
};

const MenuVoice = ({ icon, buttonText, onClick }) => {
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
				d={'inline-block'}
				onClick={onClick}>
				{buttonText}
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
								subMenu === false || subMenu !== 'map'
									? setSubMenu('map')
									: setSubMenu(false);
							}}
						/>

						<NavLink
							icon={FaUserAlt}
							hovered={hovered}
							current_url={subMenu === 'user'}
							label={'User'}
							onClick={() => {
								subMenu === false || subMenu !== 'user'
									? setSubMenu('user')
									: setSubMenu(false);
							}}
						/>

						<NavLink
							icon={AiFillMessage}
							label={'Messages'}
							hovered={hovered}
							current_url={subMenu === 'messages'}
							onClick={() => {
								subMenu === false || subMenu !== 'messages'
									? setSubMenu('messages')
									: setSubMenu(false);
							}}
						/>

						<NavLink
							icon={MdOutlineAttachMoney}
							hovered={hovered}
							current_url={subMenu === 'market'}
							label={'Market'}
							onClick={() => {
								subMenu === false || subMenu !== 'market'
									? setSubMenu('market')
									: setSubMenu(false);
							}}
						/>

						<NavLink
							icon={FaCampground}
							hovered={hovered}
							current_url={subMenu === 'camps'}
							label={'Camps'}
							onClick={() => {
								subMenu === false || subMenu !== 'camps'
									? setSubMenu('camps')
									: setSubMenu(false);
							}}
						/>

						<NavLink
							icon={SiGooglechat}
							hovered={hovered}
							label={'Chat'}
							current_url={subMenu === 'chat'}
							onClick={() => {
								subMenu === false || subMenu !== 'chat'
									? setSubMenu('chat')
									: setSubMenu(false);
							}}
						/>

						<NavLink
							icon={HiUserGroup}
							hovered={hovered}
							current_url={subMenu === 'groups'}
							label={'Groups'}
							onClick={() => {
								subMenu === false || subMenu !== 'groups'
									? setSubMenu('groups')
									: setSubMenu(false);
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
						<MenuVoice
							icon={FaMap}
							title={'Full Map'}
							buttonText={'Full Map'}
							onClick={() => {
								setModalState({ test: !modalState.test });
							}}
						/>
						<MenuVoice
							icon={BsFillPinMapFill}
							title={'Fast Map'}
							buttonText={'Fast Map'}
						/>
						<MenuVoice
							icon={GiPathDistance}
							title={'Calc Distance'}
							buttonText={'Calc Distance'}
						/>
						<MenuVoice
							icon={MdEmojiPeople}
							title={'Presences'}
							buttonText={'Presences'}
						/>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'user'}
						title={'USER'}>
						<MenuVoice
							icon={ImProfile}
							title={'Profile'}
							buttonText={'Profile'}
						/>
						<MenuVoice
							icon={FaBox}
							title={'Resources'}
							buttonText={'Resources'}
						/>
						<MenuVoice
							icon={CgArrowsExchangeAlt}
							title={'Change Character'}
							buttonText={'Change Character'}
						/>
						<MenuVoice
							icon={HiLogout}
							title={'Logout'}
							buttonText={'Logout'}
						/>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'messages'}
						title={'MESSAGES'}>
						<MenuVoice
							icon={FaEnvelopeOpenText}
							title={'Personal'}
							buttonText={'Personal'}
						/>
						<MenuVoice
							icon={GoRadioTower}
							title={'Radio'}
							buttonText={'Radio'}
						/>
						<MenuVoice
							icon={FaEdit}
							title={'Forum'}
							buttonText={'Forum'}
						/>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						title={'MARKET'}
						menuOpenedOn={'market'}>
						<MenuVoice
							icon={GiTakeMyMoney}
							title={'Buy'}
							buttonText={'Buy'}
						/>
						<MenuVoice
							icon={GiReceiveMoney}
							title={'Sell'}
							buttonText={'Sell'}
						/>
						<MenuVoice
							icon={FaHandshake}
							title={'Exchange'}
							buttonText={'Exchange'}
						/>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'camps'}
						title={'CAMPS'}>
						<MenuVoice
							icon={FaClipboardList}
							title={'List'}
							buttonText={'List'}
						/>
						<MenuVoice
							icon={FaWrench}
							title={'Edit'}
							buttonText={'Edit'}
						/>
						<MenuVoice
							icon={BiCoinStack}
							title={'Resources'}
							buttonText={'Resources'}
						/>
						<MenuVoice
							icon={FaWarehouse}
							title={'Warehouses'}
							buttonText={'Warehouses'}
						/>
						<MenuVoice
							icon={FaUserShield}
							title={'Troops'}
							buttonText={'Troops'}
						/>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'chat'}
						title={'CHAT'}>
						<MenuVoice
							icon={BsFillInfoCircleFill}
							title={'Info Chat'}
							buttonText={'Info Chat'}
						/>
						<MenuVoice
							icon={ImFlag}
							title={'Factions'}
							buttonText={'Factions'}
						/>
						<MenuVoice
							icon={MdOutlinePeople}
							title={'PNG'}
							buttonText={'PNG'}
						/>
						<MenuVoice
							icon={SiRoamresearch}
							title={'Hunt'}
							buttonText={'Hunt'}
						/>
						<MenuVoice
							icon={RiStarFill}
							title={'Events'}
							buttonText={'Events'}
						/>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'groups'}
						title={'Groups'}>
						<MenuVoice
							icon={AiOutlineUnorderedList}
							title={'List'}
							buttonText={'List'}
						/>
					</SubMenu>
				</Box>
			</Flex>
		</Box>
	);
};

export default Header;
