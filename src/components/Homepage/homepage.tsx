import { Box, Text } from '@chakra-ui/react';
import Logo from '../Utils/logo';
import { Formik, Form } from 'formik';
import { CreateSingleInput, CreateSubmitInput } from '../Utils/Formik';
import * as Yup from 'yup';
import { getRegistration, getLogin, getRecPass } from '../../apollo/Homepage';
import Particles from 'react-tsparticles';
import config_particles from './../Particles/homepage.json';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import React from 'react';
import {
	loginDataInterface,
	recPassDataInterface,
	registrationDataInterface,
} from './homepage.model';
import { useTranslation } from 'react-i18next';

const Homepage = () => {
	const [formContent, setFormContent] = useState('login');
	const toast = useToast();
	const { t } = useTranslation();

	let loginInitialValues = {
		username: '',
		password: '',
	};
	const loginSchemaValidation = Yup.object({
		username: Yup.string().required('required'),
		password: Yup.string().required('required'),
	});

	let registrationInitialValues = {
		username: '',
		email: '',
		password: '',
		password_confirm: '',
	};
	const registrationSchemaValidation = Yup.object({
		username: Yup.string().required('required'),
		email: Yup.string().email('Only valid emails').required('required'),
		password: Yup.string().required('required'),
		password_confirm: Yup.string().required('required'),
	});

	let recPassInitialValues = {
		email: '',
	};
	const recPassSchemaValidation = Yup.object({
		email: Yup.string().email('Only valid emails').required('required'),
	});

	const loginSubmit = (data: loginDataInterface) => {
		getLogin(data).then((resp) => {
			if (resp.login) {
				let status = resp.login.responseStatus;
				let token = resp.login.token;
				let response = resp.login.response;

				toast({
					title: response,
					status: status,
					duration: 9000,
					isClosable: true,
				});

				if (status === 'success') {
					localStorage.clear();
					localStorage.setItem('token', token);

					setTimeout(function () {
						window.location.href = '/charSelect';
					}, 1500);
				}
			}
		});
	};

	const registrationSubmit = async (data: registrationDataInterface) => {
		getRegistration(data).then((resp) => {
			if (resp.registration) {
				let status = resp.registration.responseStatus;
				let response = resp.registration.response;

				toast({
					title: status,
					status: response ? 'success' : 'error',
					duration: 9000,
					isClosable: true,
				});

				if (response) {
					setFormContent('login');
				}
			}
		});
	};

	const recPassSubmit = async (data: recPassDataInterface) => {
		getRecPass(data).then((resp) => {
			if (resp.recPass) {
				let status = resp.recPass.responseStatus;
				let response = resp.recPass.response;

				toast({
					title: response,
					status: status,
					duration: 9000,
					isClosable: true,
				});

				if (status === 'success') {
					setFormContent('login');
				}
			}
		});
	};

	return (
		<>
			<Box
				d={'flex'}
				zIndex={50}
				m={0}
				p={0}
				justifyContent={'center'}
				backgroundRepeat={'no-repeat'}
				backgroundSize={'cover'}
				alignItems={'center'}
				userSelect={'none'}
				backgroundImage={
					"url('./../images/homepage/homepage-image.png')"
				}
				className={'h-screen w-screen'}>
				{/*@ts-ignore*/}
				<Particles options={config_particles} className={'z-0'} />
				<Box
					d={'flex'}
					py={0.5}
					rounded={'md'}
					backgroundColor={'green.border'}
					justifyContent={'center'}
					alignItems={'center'}
					clipPath={
						'polygon(0 0, 85% 0%, 100% 0, 100% 85%, 90% 100%, 0 100%)'
					}
					style={{
						boxShadow: '0 0 15px -5px rgba(0, 0, 0, 1)',
					}}>
					<Box
						rounded={'md'}
						backgroundColor={'green.background'}
						py={5}
						px={10}
						height={'calc(100% - 2px)'}
						width={'calc(100% - 2px)'}
						clipPath={
							'polygon(0 0, 85% 0%, 100% 0, 100% 85%, 90% 100%, 0 100%)'
						}>
						{/*LOGO + NAME */}
						<Box
							d={'flex'}
							w={'full'}
							alignItems={'center'}
							justifyContent={'center'}>
							<Box className={'w-20'}>
								<Logo className={'hover:border-green-border'} />
							</Box>

							<Text
								fontSize={'6xl'}
								m={3}
								fontFamily={'TecFont'}
								color={'green.text'}
								_hover={{
									color: 'green.border',
								}}
								letterSpacing={'wider'}
								className={'text-border'}>
								{t('general.siteName')}
							</Text>
						</Box>

						<Box w={'full'} mt={5} className={'h-1/3'}>
							{formContent === 'login' && (
								<Formik
									initialValues={loginInitialValues}
									validationSchema={loginSchemaValidation}
									onSubmit={loginSubmit}>
									<Form>
										<CreateSingleInput
											name={'username'}
											placeholder={t(
												'homepage.forms.login.username'
											)}
										/>

										<CreateSingleInput
											name={'password'}
											type={'password'}
											placeholder={t(
												'homepage.forms.login.password'
											)}
										/>

										<CreateSubmitInput />
									</Form>
								</Formik>
							)}
							{formContent === 'registration' && (
								<Formik
									initialValues={registrationInitialValues}
									validationSchema={
										registrationSchemaValidation
									}
									onSubmit={registrationSubmit}>
									<Form style={{ textAlign: 'center' }}>
										<CreateSingleInput
											name={'username'}
											placeholder={t(
												'homepage.forms.registration.username'
											)}
										/>
										<CreateSingleInput
											name={'email'}
											type={'email'}
											placeholder={t(
												'homepage.forms.registration.email'
											)}
										/>

										<CreateSingleInput
											name={'password'}
											type={'password'}
											placeholder={t(
												'homepage.forms.registration.password'
											)}
										/>

										<CreateSingleInput
											name={'password_confirm'}
											type={'password'}
											placeholder={t(
												'homepage.forms.registration.passwordConfirm'
											)}
										/>

										<CreateSubmitInput />
									</Form>
								</Formik>
							)}
							{formContent === 'recPass' && (
								<Formik
									initialValues={recPassInitialValues}
									validationSchema={recPassSchemaValidation}
									onSubmit={recPassSubmit}>
									<Form style={{ textAlign: 'center' }}>
										<CreateSingleInput
											name={'email'}
											type={'email'}
											placeholder={t(
												'homepage.forms.recPass.email'
											)}
										/>

										<CreateSubmitInput />
									</Form>
								</Formik>
							)}
						</Box>

						<Box
							d={'flex'}
							m={'auto'}
							alignItems={'center'}
							justifyContent={'center'}
							textAlign={'center'}
							mt={5}
							color={'green.border'}
							className={'w-3/4'}>
							{formContent !== 'registration' && (
								<Box
									d={'flex'}
									justifyContent={'center'}
									className={'w-1/2'}>
									<Text
										cursor={'pointer'}
										_hover={{
											color: 'green.light',
											textDecoration: 'underline',
										}}
										onClick={() =>
											setFormContent('registration')
										}>
										{t(
											'homepage.forms.registration.button'
										)}
									</Text>
								</Box>
							)}

							{formContent !== 'login' && (
								<Box
									d={'flex'}
									justifyContent={'center'}
									className={'w-1/2'}>
									<Text
										cursor={'pointer'}
										_hover={{
											color: 'green.light',
											textDecoration: 'underline',
										}}
										onClick={() => setFormContent('login')}>
										{t('homepage.forms.login.button')}
									</Text>
								</Box>
							)}
							{formContent !== 'recPass' && (
								<Box
									d={'flex'}
									justifyContent={'center'}
									className={'w-1/2'}>
									<Text
										cursor={'pointer'}
										_hover={{
											color: 'green.light',
											textDecoration: 'underline',
										}}
										onClick={() =>
											setFormContent('recPass')
										}>
										{t('homepage.forms.recPass.button')}
									</Text>
								</Box>
							)}
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Homepage;
