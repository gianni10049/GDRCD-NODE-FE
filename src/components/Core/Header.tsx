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
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toggleCharacterModal } from '../../redux/characterModals';
import { toggleBankModal } from '../../redux/bankModal';
import { toggleMessagesModal } from '../../redux/messagesModal';
import { toggleRadioModal } from '../../redux/radioModal';
import { toggleGroupsModal } from '../../redux/groupsModal';
import { toggleForumModal } from '../../redux/forumModal';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { chatStorageSelector } from '../../redux/ChatStorage';

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
							fontFamily={'TecFont'}
							letterSpacing={'wider'}
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
	const { t } = useTranslation();
	const dispatch = useDispatch();
	let navigate = useNavigate();
	let chatStorage = useSelector(chatStorageSelector);

	// TODO - Toggle tasto chat quando in chat

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
							label={t('mainMenu.map.button')}
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
							label={t('mainMenu.user.button')}
							onClick={() => {
								subMenu === '' || subMenu !== 'user'
									? setSubMenu('user')
									: setSubMenu('');
							}}
						/>

						<NavLink
							icon={AiFillMessage}
							label={t('mainMenu.messages.button')}
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
							label={t('mainMenu.market.button')}
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
							label={t('mainMenu.camps.button')}
							onClick={() => {
								subMenu === '' || subMenu !== 'camps'
									? setSubMenu('camps')
									: setSubMenu('');
							}}
						/>

						{chatStorage.isInChat && (
							<NavLink
								icon={SiGooglechat}
								hovered={hovered}
								label={t('mainMenu.chat.button')}
								current_url={subMenu === 'chat'}
								onClick={() => {
									subMenu === '' || subMenu !== 'chat'
										? setSubMenu('chat')
										: setSubMenu('');
								}}
							/>
						)}

						<NavLink
							icon={HiUserGroup}
							hovered={hovered}
							current_url={subMenu === 'groups'}
							label={t('mainMenu.groups.button')}
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
						title={t('mainMenu.map.button')}>
						<MenuVoice
							icon={FaMap}
							buttonText={t('mainMenu.map.fullMap')}
						/>
						<MenuVoice
							icon={BsFillPinMapFill}
							buttonText={t('mainMenu.map.fastMap')}
						/>
						<MenuVoice
							icon={GiPathDistance}
							buttonText={t('mainMenu.map.distance')}
						/>
						<MenuVoice
							icon={MdEmojiPeople}
							buttonText={t('mainMenu.map.presences')}
						/>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'user'}
						title={t('mainMenu.user.button')}>
						<MenuVoice
							icon={ImProfile}
							buttonText={t('mainMenu.user.profile')}
							onClick={() => {
								dispatch(toggleCharacterModal({}));
							}}
						/>
						<MenuVoice
							icon={FaBox}
							buttonText={t('mainMenu.user.resources')}
							onClick={() => {
								dispatch(toggleBankModal());
							}}
						/>
						<MenuVoice
							icon={CgArrowsExchangeAlt}
							buttonText={t('mainMenu.user.changeCharacter')}
							onClick={() => {
								navigate('/charSelect');
							}}
						/>
						<MenuVoice
							icon={HiLogout}
							buttonText={t('mainMenu.user.logout')}
							onClick={() => {
								navigate('/logout');
							}}
						/>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'messages'}
						title={t('mainMenu.messages.button')}>
						<MenuVoice
							icon={FaEnvelopeOpenText}
							buttonText={t('mainMenu.messages.personal')}
							onClick={() => {
								dispatch(toggleMessagesModal({}));
							}}
						/>
						<MenuVoice
							icon={GoRadioTower}
							buttonText={t('mainMenu.messages.radio')}
							onClick={() => {
								dispatch(toggleRadioModal({}));
							}}
						/>
						<MenuVoice
							icon={FaEdit}
							buttonText={t('mainMenu.messages.forum')}
							onClick={() => {
								dispatch(toggleForumModal({}));
							}}
						/>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						title={t('mainMenu.market.button')}
						menuOpenedOn={'market'}>
						<MenuVoice
							icon={GiTakeMyMoney}
							buttonText={t('mainMenu.market.buy')}
						/>
						<MenuVoice
							icon={GiReceiveMoney}
							buttonText={t('mainMenu.market.sell')}
						/>
						<MenuVoice
							icon={FaHandshake}
							buttonText={t('mainMenu.market.exchange')}
						/>
					</SubMenu>

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'camps'}
						title={t('mainMenu.camps.button')}>
						<MenuVoice
							icon={FaClipboardList}
							buttonText={t('mainMenu.camps.list')}
						/>
						<MenuVoice
							icon={FaWrench}
							buttonText={t('mainMenu.camps.edit')}
						/>
						<MenuVoice
							icon={BiCoinStack}
							buttonText={t('mainMenu.camps.resources')}
						/>
						<MenuVoice
							icon={FaWarehouse}
							buttonText={t('mainMenu.camps.warehouse')}
						/>
						<MenuVoice
							icon={FaUserShield}
							buttonText={t('mainMenu.camps.troops')}
						/>
					</SubMenu>

					{chatStorage.isInChat && (
						<SubMenu
							actualSubMenu={subMenu}
							menuOpenedOn={'chat'}
							title={t('mainMenu.chat.button')}>
							<MenuVoice
								icon={BsFillInfoCircleFill}
								buttonText={t('mainMenu.chat.info')}
							/>
							<MenuVoice
								icon={ImFlag}
								buttonText={t('mainMenu.chat.factions')}
							/>
							<MenuVoice
								icon={MdOutlinePeople}
								buttonText={t('mainMenu.chat.png')}
							/>
							<MenuVoice
								icon={SiRoamresearch}
								buttonText={t('mainMenu.chat.hunt')}
							/>
							<MenuVoice
								icon={RiStarFill}
								buttonText={t('mainMenu.chat.events')}
							/>
						</SubMenu>
					)}

					<SubMenu
						actualSubMenu={subMenu}
						menuOpenedOn={'groups'}
						title={t('mainMenu.groups.button')}>
						<MenuVoice
							icon={AiOutlineUnorderedList}
							buttonText={t('mainMenu.groups.list')}
							onClick={() => {
								dispatch(toggleGroupsModal({}));
							}}
						/>
					</SubMenu>
				</Box>
			</Flex>
		</Box>
	);
};

export default Header;
