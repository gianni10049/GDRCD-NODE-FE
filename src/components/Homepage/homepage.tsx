import { Box, Button, Text } from '@chakra-ui/react';
import Logo from '../Utils/logo';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { REGISTRATION, LOGIN, RECPASS } from '../../apollo/Homepage';
import Particles from 'react-tsparticles';
import config_particles from './../Particles/homepage.json';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { GQLmutation, GQLQuery } from '../../apollo/GQL';
import React from 'react';
import {
	fieldData,
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

	const renderError = (message: string) => (
		<Box
			pb={1}
			fontWeight={'bold'}
			color={'red.600'}
			fontFamily={'TecFont'}
			letterSpacing={'wide'}>
			<Text>{message}</Text>
		</Box>
	);

	const getLogin = async (props: loginDataInterface) => {
		return await GQLQuery(LOGIN, {
			username: props.username,
			password: props.password,
		});
	};

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

	/**
	 * @return {Promise<{
	 * 					registration:{
	 * 						responseStatus:string,
	 * 						token:string,
	 * 						response:string
	 * 					}
	 * 	}>}
	 */
	const getRegistration = async (data: registrationDataInterface) => {
		return await GQLmutation(REGISTRATION, {
			username: data.username,
			email: data.email,
			password: data.password,
			password_confirm: data.password_confirm,
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

	const getRecPass = async (data: recPassDataInterface) => {
		return await GQLQuery(RECPASS, {
			email: data.email,
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

	const CreateSingleInput = (props: fieldData) => {
		return (
			<Box m={'auto'} my={5} className='w-2/4'>
				<Field
					name={props.name}
					type={props.type ?? 'text'}
					className='input w-full bg-transparent border-b border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border
												focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light'
					placeholder={props.placeholder}
				/>
				{/* @ts-ignore*/}
				<ErrorMessage name={props.name} render={renderError} />
			</Box>
		);
	};

	const CreateSubmitInput = () => {
		return (
			<Box
				d={'flex'}
				m={'auto'}
				backgroundColor={'green.border'}
				alignItems={'center'}
				justifyContent={'center'}
				_hover={{
					backgroundColor: 'green.light',
				}}
				clipPath={
					'polygon(11% 0, 100% 0, 100% 59%, 89% 100%, 0 100%, 0 40%)'
				}
				w={'200px'}
				h={'30px'}>
				<Button
					textAlign={'center'}
					bg={'green.background'}
					type='submit'
					w={'calc(100% - 2px)'}
					h={'calc(100% - 2px)'}
					rounded={'none'}
					_hover={{
						bg: 'green.light',
					}}
					clipPath={
						'polygon(11% 0, 100% 0, 100% 59%, 89% 100%, 0 100%, 0 40%)'
					}>
					<Text
						fontFamily={'TecFont'}
						color={'green.text'}
						fontSize={'xl'}
						letterSpacing={'widest'}
						className={'text-border'}>
						{t('homepage.forms.submit')}
					</Text>
				</Button>
			</Box>
		);
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
											type={'Password Confirm'}
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
