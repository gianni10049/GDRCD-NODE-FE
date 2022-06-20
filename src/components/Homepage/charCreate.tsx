import React, { useCallback } from 'react';
import config_particles from '../Particles/homepage.json';
import Logo from '../Utils/logo';
import Particles from 'react-tsparticles';
import { Box, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getMeData } from '../../apollo/Generic.model';
import { getMe } from '../../apollo/Generic';
import { CreateSingleInput, CreateSubmitInput } from '../Utils/Formik';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { createCharacter } from '../../apollo/Characters';
import { useNavigate } from 'react-router-dom';

export const CharCreate = () => {
	const [me, setMe] = useState<getMeData>(null);
	const [account, setAccount] = useState<getMeData>(null);
	const toast = useToast();
	const { t } = useTranslation();
	const navigate = useNavigate();

	let createCharacterInitialValue = {
		name: '',
		surname: '',
		age: false,
	};
	const createCharacterSchemaValidation = Yup.object({
		name: Yup.string().required('required'),
		surname: Yup.string().required('required'),
		age: Yup.number()
			.required('required')
			.min(18, t('charCreate.minimumAlert'))
			.max(60, t('charCreate.maximumAlert')),
	});

	const createCharacterSubmit = async (data: any, actions: any) => {
		createCharacter(data).then((resp) => {
			let response = resp.createCharacter.response;
			let responseStatus = resp.createCharacter.responseStatus;

			toast({
				title: responseStatus,
				status: response ? 'success' : 'error',
				duration: 9000,
				isClosable: true,
			});

			if (response) {
				actions.resetForm();
				setTimeout(() => {
					navigate('/charSelect');
				}, 1000);
			}
		});
	};

	const refetchData = useCallback(async () => {
		getMe().then((resp) => {
			setMe(resp?.getMe?.me);
			setAccount(resp?.getMe?.me?.account?.id);
		});
	}, []);

	useEffect(() => {
		refetchData();
	}, [refetchData]);

	return (
		<Box
			d={'flex'}
			h={'100vh'}
			w={'100vw'}
			m={0}
			p={0}
			backgroundRepeat={'no-repeat'}
			backgroundSize={'cover'}
			justifyContent={'center'}
			alignItems={'center'}
			userSelect={'none'}>
			{/*@ts-ignore*/}
			<Particles options={config_particles} />
			{me && account && (
				<Box
					rounded={'md'}
					d={'flex'}
					py={0.5}
					justifyContent={'center'}
					alignItems={'center'}
					bg={'green.border'}
					zIndex={50}
					clipPath={
						'polygon(0 0, 85% 0%, 100% 0, 100% 85%, 90% 100%, 0 100%)'
					}
					style={{
						boxShadow: '0 0 15px -5px rgba(0, 0, 0, 1)',
					}}>
					<Box
						rounded={'md'}
						bg={'green.background'}
						pt={5}
						pb={3}
						px={10}
						width={'calc(100% - 2px)'}
						height={'calc(100% - 2px)'}
						clipPath={
							'polygon(0 0, 85% 0%, 100% 0, 100% 85%, 90% 100%, 0 100%)'
						}>
						{/*LOGO + NAME */}
						<Box
							d={'flex'}
							w={'full'}
							alignItems={'center'}
							justifyContent={'center'}>
							<Box w={'20'}>
								<Logo />
							</Box>
							<Text
								color={'green.text'}
								fontSize={'6xl'}
								fontFamily={'TecFont'}
								letterSpacing={'wider'}
								m={3}
								_hover={{
									color: 'green.border',
								}}
								className={'text-border'}>
								{t('general.siteName')}
							</Text>
						</Box>

						<Box>
							<Box
								fontSize={'2xl'}
								textAlign={'center'}
								color={'green.light'}
								fontFamily={'TecFont'}>
								{t('charCreate.title')}
							</Box>
						</Box>

						<Box>
							<Formik
								initialValues={createCharacterInitialValue}
								validationSchema={
									createCharacterSchemaValidation
								}
								onSubmit={createCharacterSubmit}>
								<Form style={{ textAlign: 'center' }}>
									<CreateSingleInput
										name={'name'}
										type={'text'}
										placeholder={t('charCreate.name')}
									/>

									<CreateSingleInput
										name={'surname'}
										type={'text'}
										placeholder={t('charCreate.surname')}
									/>

									<CreateSingleInput
										name={'age'}
										type={'number'}
										placeholder={t('charCreate.age')}
									/>

									<CreateSubmitInput />
								</Form>
							</Formik>
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	);
};
