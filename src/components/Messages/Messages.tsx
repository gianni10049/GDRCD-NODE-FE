import React, { useCallback, useEffect, useState } from 'react';
import {
	deleteConv,
	deleteMessage,
	getMessages,
	getMessagesSenders,
	sendMessage,
} from '../../apollo/Messages';
import {
	Box,
	Image,
	Icon,
	Button,
	Tooltip,
	Text,
	useToast,
} from '@chakra-ui/react';
import { messageData } from '../../apollo/Messages.model';
import { BiMessageRoundedError, BiMailSend } from 'react-icons/bi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { getMe } from '../../apollo/Generic';
import { getMeData } from '../../apollo/Generic.model';
import moment from 'moment';
import { CreateSingleInput, renderError } from '../Utils/Formik';
import { getCharacterData, getCharactersList } from '../../apollo/Characters';
import { characterData } from '../../apollo/Tables.model';
import { AiOutlineReload, AiOutlineSend } from 'react-icons/ai';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { confirm } from 'react-confirm-box';

export const Messages = () => {
	let [senders, setSenders] = useState<messageData[]>([]);
	let [selectedSender, setSelectedSender] = useState<number>();
	let [selectedType, setSelectedType] = useState<string>();
	let [messages, setMessages] = useState<messageData[]>([]);
	let [charactersList, setCharactersList] = useState<characterData[]>([]);
	let [senderData, setSenderData] = useState<characterData>();
	let [me, setMe] = useState<getMeData>({});
	const { t } = useTranslation();
	const toast = useToast();

	const refetchData = useCallback(async () => {
		getMessagesSenders({}).then((resp) => {
			setSenders(resp.getMessagesSenders);
		});

		getMe().then((resp) => {
			setMe(resp?.getMe?.me);
		});

		if (selectedSender && selectedType) {
			getMessages({ recipient: selectedSender, type: selectedType }).then(
				(resp) => {
					setMessages(resp.getMessages);
				}
			);

			getCharacterData({ characterId: selectedSender }).then((resp) => {
				setSenderData(resp.getCharacter);
			});
		} else {
			getCharactersList().then((resp) => {
				setCharactersList(resp.getCharactersList);
			});
		}
	}, [selectedSender, selectedType]);

	useEffect(() => {
		refetchData();
	}, [refetchData]);

	const loadMessages = async (id: number, type: string) => {
		setSelectedSender(id);
		setSelectedType(type);
	};

	let sendMessageInitialValues = {
		text: '',
	};
	const sendMessagesValidation = Yup.object({
		text: Yup.string().required('required'),
	});

	const sendMessageSubmit = async (data: any, actions: any) => {
		data.recipient = selectedSender;
		data.type = selectedType;

		sendMessage(data).then((resp) => {
			setMessages(resp.sendMessage);
			actions.resetForm();
		});
	};

	let sendNewMessageInitialValues = {
		text: '',
		recipient: '',
		type: '',
	};
	const sendNewMessagesValidation = Yup.object({
		text: Yup.string().required('required'),
		recipient: Yup.number().required('required'),
		type: Yup.string().required('required'),
	});

	const sendNewMessageSubmit = async (data: any, actions: any) => {
		sendMessage(data).then((resp) => {
			setSelectedSender(data.recipient);
			setMessages(resp.sendMessage);
			actions.resetForm();
		});
	};

	const resetMex = async () => {
		setSelectedSender(null);
		setSelectedType(null);
	};

	const deleteMessagefn = async (id: number) => {
		if (await confirm(t('messages.deleteMexConfirm'))) {
			deleteMessage({ message: id }).then((resp) => {
				setMessages(resp.deleteMessage);
			});
		}
	};

	const deleteConvfn = async (id: number, type: string) => {
		if (await confirm(t('messages.deleteConvConfirm'))) {
			deleteConv({ sender: id, type: type }).then((resp) => {
				if (resp.deleteConv.response) {
					refetchData();
				}

				toast({
					title: resp?.deleteConv?.responseStatus,
					status: resp?.deleteConv?.response ? 'success' : 'error',
					duration: 9000,
					isClosable: true,
				});
			});
		}
	};

	return (
		<>
			<Box h={'full'} w={'full'} d={'flex'}>
				<Box>
					<Tooltip
						hasArrow
						label={t('messages.refetchMessage')}
						bg={'green.light'}
						color={'green.text'}
						fontSize={'md'}
						fontFamily={'TecFont'}
						letterSpacing={'widest'}
						fontWeight={'extrabold'}>
						<Box
							pos={'fixed'}
							top={1.5}
							left={2}
							w={7}
							h={7}
							cursor={'pointer'}
							justifyContent={'center'}
							alignItems={'center'}
							d={'flex'}
							bg={'white'}
							zIndex={2}
							color={'green.light'}
							onClick={refetchData}
							rounded={'full'}>
							<Icon as={AiOutlineReload} boxSize={5} />
						</Box>
					</Tooltip>
					<Tooltip
						hasArrow
						label={t('messages.sendNew')}
						bg={'green.light'}
						color={'green.text'}
						fontSize={'md'}
						fontFamily={'TecFont'}
						letterSpacing={'widest'}
						fontWeight={'extrabold'}>
						<Box
							pos={'fixed'}
							top={1.5}
							left={10}
							w={7}
							h={7}
							cursor={'pointer'}
							justifyContent={'center'}
							alignItems={'center'}
							d={'flex'}
							bg={'white'}
							zIndex={2}
							color={'green.light'}
							onClick={resetMex}
							rounded={'full'}>
							<Icon as={AiOutlineSend} boxSize={5} />
						</Box>
					</Tooltip>
				</Box>

				{/*LEFT COLUMN */}
				<Box
					w={'250px'}
					h={'full'}
					borderRight={'1px solid'}
					borderColor={'green.light'}
					overflow={'auto'}>
					{senders?.map((sender: messageData, i: number) => (
						<Box
							w={'calc(100% - 10px)'}
							key={i}
							borderColor={'green.light'}
							_last={{
								borderWidth: '1px 0',
							}}
							borderWidth={'1px 0 0 0'}>
							{sender?.sender !== me?.character?.id && (
								<>
									<Box
										padding={'10px 0 5px 0'}
										d={'flex'}
										color={'green.textLight'}
										alignItems={'center'}>
										<Box w={'30px'} h={'30px'}>
											<Image
												w={'full'}
												h={'full'}
												objectFit={'cover'}
												src={
													sender?.senderData
														?.mini_avatar
												}
												alt={
													sender?.senderData?.fullname
												}
											/>
										</Box>
										<Box ml={2} fontSize={12}>
											{sender?.senderData?.fullname}
										</Box>
									</Box>
									<Box
										d={'flex'}
										justifyContent={'space-between'}
										ml={2}
										m={'0 auto 5px auto'}
										color={'green.textLight'}>
										<Box d={'flex'}>
											<Tooltip
												hasArrow
												label={t(
													'messages.deleteConvOn'
												)}
												bg={'green.light'}
												color={'green.text'}
												fontSize={'md'}
												fontFamily={'TecFont'}
												letterSpacing={'widest'}
												fontWeight={'extrabold'}>
												<Box>
													<Icon
														boxSize={4}
														mt={1}
														mr={2}
														as={
															MdOutlineDeleteForever
														}
														_hover={{
															color: 'green.light',
														}}
														cursor={'pointer'}
														onClick={() =>
															deleteConvfn(
																sender?.sender,
																'on'
															)
														}
													/>
												</Box>
											</Tooltip>
											<Box
												d={'flex'}
												justifyContent={'center'}
												alignItems={'center'}
												bg={'green.backgroundDark'}
												p={'0 5px'}
												mr={2}
												border={'1px solid'}
												borderColor={'green.light'}
												_hover={{
													color: 'green.light',
													cursor: 'pointer',
													bg: 'green.lightOpacity',
												}}
												onClick={() =>
													loadMessages(
														sender?.sender,
														'on'
													)
												}>
												ON{' '}
												{sender?.new_on && (
													<Icon
														ml={1}
														boxSize={4}
														color={'green.light'}
														as={
															BiMessageRoundedError
														}
													/>
												)}
											</Box>
										</Box>
										<Box d={'flex'}>
											<Box
												d={'flex'}
												justifyContent={'center'}
												alignItems={'center'}
												bg={'green.backgroundDark'}
												p={'0 5px'}
												border={'1px solid'}
												borderColor={'green.light'}
												_hover={{
													color: 'green.light',
													cursor: 'pointer',
													bg: 'green.lightOpacity',
												}}
												onClick={() =>
													loadMessages(
														sender?.sender,
														'off'
													)
												}>
												OFF{' '}
												{sender?.new_off && (
													<Icon
														ml={1}
														boxSize={4}
														color={'green.light'}
														as={
															BiMessageRoundedError
														}
													/>
												)}
											</Box>

											<Tooltip
												hasArrow
												label={t(
													'messages.deleteConvOff'
												)}
												bg={'green.light'}
												color={'green.text'}
												fontSize={'md'}
												fontFamily={'TecFont'}
												letterSpacing={'widest'}
												fontWeight={'extrabold'}>
												<Box>
													<Icon
														boxSize={4}
														ml={2}
														mt={1}
														as={
															MdOutlineDeleteForever
														}
														_hover={{
															color: 'green.light',
														}}
														cursor={'pointer'}
														onClick={() =>
															deleteConvfn(
																sender?.sender,
																'off'
															)
														}
													/>
												</Box>
											</Tooltip>
										</Box>
									</Box>
								</>
							)}
						</Box>
					))}
				</Box>

				{messages ? (
					<Box h='full' w='full' ml={2}>
						<Box
							color={'green.light'}
							fontWeight={'bold'}
							textAlign={'center'}
							fontSize={20}
							borderColor={'green.light'}
							borderWidth={'0 0 1px 0'}
							h={'30px'}>
							{senderData?.fullname} - {selectedType}
						</Box>

						<Box
							h={'calc(100% - 80px)'}
							p={'2px'}
							border={'1px solid'}
							bg={'green.background'}
							overflow={'auto'}
							borderColor={'green.light'}>
							{messages?.map(
								(message: messageData, i: number) => (
									<Box
										key={i}
										d={'flex'}
										w={'full'}
										justifyContent={
											me?.character?.id ===
											message?.sender
												? 'start'
												: 'end'
										}>
										<Box
											color={'white'}
											border={'1px solid'}
											borderColor={'green.light'}
											m={'2px 4px'}
											w={'50%'}
											p={'2px 5px'}
											bg={
												message?.readData?.[0]
													? 'green.backgroundDark'
													: 'red.opacity'
											}
											boxSizing={'border-box'}
											textAlign={
												me?.character?.id ===
												message?.sender
													? 'left'
													: 'right'
											}>
											<Box
												w={'full'}
												h={'30px'}
												m={'2px 0'}
												justifyContent={
													me?.character?.id ===
													message?.sender
														? 'start'
														: 'end'
												}
												d={'flex'}>
												<Image
													w={'30px'}
													h={'30px'}
													objectFit={'cover'}
													justifySelf={'end'}
													border={'1px solid'}
													borderColor={'green.light'}
													src={
														message?.senderData
															?.mini_avatar
													}
												/>

												<Icon
													boxSize={4}
													ml={2}
													mt={1}
													as={MdOutlineDeleteForever}
													_hover={{
														color: 'green.light',
													}}
													cursor={'pointer'}
													onClick={() =>
														deleteMessagefn(
															message.id
														)
													}
												/>
											</Box>
											<Text
												color={'green.textLight'}
												fontSize={15}>
												{message?.text}
											</Text>
											<Text
												textAlign={
													me?.character?.id ===
													message?.sender
														? 'right'
														: 'left'
												}
												color={'green.textLight'}
												fontSize={10}>
												{moment(
													Number(message?.createdAt)
												)?.format('HH:mm DD/MM/YYYY')}
											</Text>
										</Box>
									</Box>
								)
							)}
						</Box>
						<Box
							w={'full'}
							h={'50px'}
							borderBottom={'solid'}
							borderWidth={'0 0 1px 0'}
							borderColor={'green.light'}>
							<Formik
								initialValues={sendMessageInitialValues}
								validationSchema={sendMessagesValidation}
								onSubmit={sendMessageSubmit}>
								<Form>
									<Box d={'flex'} h={'full'}>
										<Box w={'full'} h={'40px'}>
											<Field
												name={'text'}
												as={'textarea'}
												className={`input mt-1 resize-none w-full h-full bg-transparent border-b border-t border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light`}
												placeholder={'Testo'}
											/>
										</Box>
										<Box
											h={'50px'}
											d={'flex'}
											justifyContent={'center'}
											alignItems={'center'}>
											<Tooltip
												hasArrow
												label={t('messages.send')}
												bg={'green.light'}
												color={'green.text'}
												fontSize={'md'}
												fontFamily={'TecFont'}
												letterSpacing={'widest'}
												fontWeight={'extrabold'}>
												<Button
													ml={3}
													textAlign={'center'}
													type='submit'
													rounded={'none'}
													p={0}
													border={'1px solid'}
													borderColor={'green.light'}
													color={'green.textLight'}
													_hover={{
														bg: 'green.lightOpacity',
														color: 'green.light',
													}}
													bg={'transparent'}>
													<Icon
														boxSize={6}
														as={BiMailSend}
													/>
												</Button>
											</Tooltip>
										</Box>
									</Box>
								</Form>
							</Formik>
						</Box>
					</Box>
				) : (
					<Box h='full' w='full' ml={2}>
						<Text
							textAlign={'center'}
							color={'green.textLight'}
							fontSize={20}
							fontWeight={'bold'}>
							{t('messages.newMessageText')}
						</Text>
						<Formik
							initialValues={sendNewMessageInitialValues}
							validationSchema={sendNewMessagesValidation}
							onSubmit={sendNewMessageSubmit}>
							<Form>
								<CreateSingleInput
									name={'recipient'}
									type={'select'}
									placeholder={t('general.character')}
									fields={charactersList}
									fieldValue={'id'}
									fieldLabel={'fullname'}
								/>

								<CreateSingleInput
									placeholder={t('general.type')}
									name={'type'}
									type={'select'}
									fields={[
										{ id: 'on', label: 'ON' },
										{ id: 'off', label: 'OFF' },
									]}
									fieldValue={'id'}
									fieldLabel={'label'}
								/>

								<Box d={'flex'} h={'full'}>
									<Box w={'full'} h={'40px'}>
										<Field
											name={'text'}
											as={'textarea'}
											className={`input mt-1 resize-none w-full h-full bg-transparent border-b border-t border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light`}
											placeholder={'Testo'}
										/>
										{/* @ts-ignore*/}
										<ErrorMessage
											name={'text'}
											render={renderError}
										/>
									</Box>
									<Box
										h={'50px'}
										d={'flex'}
										justifyContent={'center'}
										alignItems={'center'}>
										<Tooltip
											hasArrow
											label={t('messages.send')}
											bg={'green.light'}
											color={'green.text'}
											fontSize={'md'}
											fontFamily={'TecFont'}
											letterSpacing={'widest'}
											fontWeight={'extrabold'}>
											<Button
												ml={3}
												textAlign={'center'}
												type='submit'
												rounded={'none'}
												p={0}
												border={'1px solid'}
												borderColor={'green.light'}
												color={'green.textLight'}
												_hover={{
													bg: 'green.lightOpacity',
													color: 'green.light',
												}}
												bg={'transparent'}>
												<Icon
													boxSize={6}
													as={BiMailSend}
												/>
											</Button>
										</Tooltip>
									</Box>
								</Box>
							</Form>
						</Formik>
					</Box>
				)}
			</Box>
		</>
	);
};
