import React, { useCallback, useEffect, useState } from 'react';
import {
	radioFrequencieData,
	radioFrequencieMessagesData,
} from '../../apollo/Messages.model';
import {
	Box,
	Image,
	Icon,
	Button,
	Tooltip,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AiOutlineReload } from 'react-icons/ai';
import { FiRadio } from 'react-icons/fi';
import { BiMailSend } from 'react-icons/bi';
import { getMe } from '../../apollo/Generic';
import { getMeData } from '../../apollo/Generic.model';
import moment from 'moment';
import {
	getFrequencies,
	getFrequencyMessages,
	sendFrequencyMessages,
} from '../../apollo/Messages';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { renderError } from '../Utils/Formik';

export const Radio = () => {
	const { t } = useTranslation();
	const toast = useToast();
	let last_type = '';
	let stamp = false;

	const [frequencies, setFrequencies] = useState<radioFrequencieData[]>([]);
	const [selectedFrequency, setSelectedFrequency] = useState<number>();
	let [selectedFrequencyData, setSelectedFrequencyData] =
		useState<radioFrequencieData>();
	let [messages, setMessages] = useState<radioFrequencieMessagesData[]>([]);
	let [me, setMe] = useState<getMeData>({});

	const refetchData = useCallback(async () => {
		getMe().then((resp) => {
			setMe(resp?.getMe?.me);
		});

		getFrequencies({}).then((resp) => {
			setFrequencies(resp?.getFrequencies);
		});

		if (selectedFrequency) {
			getFrequencyMessages({
				frequency: selectedFrequency,
			}).then((resp) => {
				if (resp.getFrequencyMessages.response) {
					setMessages(resp.getFrequencyMessages.messages);
					setSelectedFrequencyData(
						resp.getFrequencyMessages.frequency
					);
				} else {
					toast({
						title: resp?.getFrequencyMessages?.responseStatus,
						status: 'error',
						duration: 9000,
						isClosable: true,
					});
					setSelectedFrequency(null);
				}
			});
		}
	}, [selectedFrequency, toast]);

	useEffect(() => {
		refetchData();
	}, [refetchData]);

	let sendMessageInitialValues = {
		text: '',
	};
	const sendMessagesValidation = Yup.object({
		text: Yup.string().required('required'),
	});

	const sendMessageSubmit = async (data: any, actions: any) => {
		data.frequency = selectedFrequency;

		sendFrequencyMessages(data).then(() => {
			refetchData();
			actions.resetForm();
		});
	};

	const loadMessages = async (id: number) => {
		setSelectedFrequency(id);
	};

	let selectFrequencyValue = {
		frequency: '',
	};
	const selectFrequencyValidation = Yup.object({
		frequency: Yup.number()
			.min(1, t('modals.radio.frequencyMinimumAlert'))
			.max(999, t('modals.radio.frequencyMaxAlert'))
			.required('required'),
	});

	const selectFrequency = async (data: any) => {
		if (data.frequency) {
			setSelectedFrequency(data.frequency);
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
				</Box>

				{/*LEFT COLUMN */}
				<Box
					w={'250px'}
					h={'full'}
					borderRight={'1px solid'}
					borderColor={'green.light'}
					overflow={'auto'}>
					<Box mb={5}>
						<Box
							color={'green.light'}
							fontWeight={'bold'}
							textAlign={'center'}
							fontSize={12}
							borderColor={'green.light'}
							borderWidth={'0 0 1px 0'}>
							Frequenza custom
						</Box>

						<Box mt={2} mb={2}>
							<Formik
								initialValues={selectFrequencyValue}
								validationSchema={selectFrequencyValidation}
								onSubmit={selectFrequency}>
								<Form>
									<Box d={'flex'} h={'full'}>
										<Box w={'full'} h={'20px'}>
											<Field
												name={'frequency'}
												type={'number'}
												className={`input mt-1 resize-none w-full h-full bg-transparent border-b border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light`}
												placeholder={t(
													'modals.radio.frequency'
												)}
											/>
											{/* @ts-ignore*/}
											<ErrorMessage
												name={'frequency'}
												render={renderError}
											/>
										</Box>
										<Box
											h={'20px'}
											d={'flex'}
											justifyContent={'center'}
											alignItems={'center'}>
											<Tooltip
												hasArrow
												label={t('modals.radio.tune')}
												bg={'green.light'}
												color={'green.text'}
												fontSize={'md'}
												fontFamily={'TecFont'}
												letterSpacing={'widest'}
												fontWeight={'extrabold'}>
												<Button
													ml={1}
													mr={1}
													textAlign={'center'}
													type='submit'
													rounded={'none'}
													p={0}
													minWidth={0}
													minHeight={0}
													height={'auto'}
													color={'green.textLight'}
													_hover={{
														color: 'green.light',
													}}
													bg={'transparent'}>
													<Icon
														boxSize={5}
														as={FiRadio}
													/>
												</Button>
											</Tooltip>
										</Box>
									</Box>
								</Form>
							</Formik>
						</Box>
					</Box>

					{frequencies?.map(
						(frequence: radioFrequencieData, i: number) => {
							if (last_type !== frequence.type) {
								stamp = true;
								last_type = frequence.type;
							} else {
								stamp = false;
							}

							return (
								<Box key={i}>
									{stamp && (
										<Box
											color={'green.light'}
											fontWeight={'bold'}
											textAlign={'center'}
											fontSize={20}
											borderColor={'green.light'}
											borderWidth={'0 0 1px 0'}>
											{frequence.type}
										</Box>
									)}

									<Box w={'calc(100% - 10px)'}>
										<Box
											padding={'10px 0 5px 0'}
											d={'flex'}
											color={'green.textLight'}
											fontSize={13}
											alignItems={'center'}
											onClick={() =>
												loadMessages(
													frequence.frequency
												)
											}>
											{frequence.frequency} -{' '}
											{frequence.name}
										</Box>
									</Box>
								</Box>
							);
						}
					)}
				</Box>

				{selectedFrequency && (
					<Box h='full' w='full' ml={2}>
						<Box
							color={'green.light'}
							fontWeight={'bold'}
							textAlign={'center'}
							fontSize={18}
							borderColor={'green.light'}
							borderWidth={'0 0 1px 0'}
							h={'30px'}>
							{t('modals.radio.tunedOn')}{' '}
							{selectedFrequencyData?.name ?? selectedFrequency}
						</Box>

						<Box
							h={'calc(100% - 80px)'}
							p={'2px'}
							border={'1px solid'}
							bg={'green.background'}
							overflow={'auto'}
							borderColor={'green.light'}>
							{messages?.map(
								(
									message: radioFrequencieMessagesData,
									i: number
								) => (
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
											bg={'green.backgroundDark'}
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
												)?.format('HH:mm MM/DD/YYYY')}
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
				)}
			</Box>
		</>
	);
};
