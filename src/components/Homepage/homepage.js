import { Box, Text } from '@chakra-ui/react';
import Logo from '../Utils/logo';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLazyQuery, useMutation } from '@apollo/client';
import { REGISTRATION, LOGIN, RECPASS } from '../Utils/Apollo';
import Particles from 'react-tsparticles';
import config_particles from './../Particles/homepage.json';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

const Homepage = () => {
	const [registrationQuery] = useMutation(REGISTRATION);
	const [loginQuery] = useLazyQuery(LOGIN);
	const [recPassQuery] = useLazyQuery(RECPASS);
	const [formContent, setFormContent] = useState('login');
	const toast = useToast();

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
		email: Yup.string().email('Only valid emails'),
		password: Yup.string().required('required'),
		password_confirm: Yup.string().required('required'),
	});

	let recPassInitialValues = {
		email: '',
	};
	const recPassSchemaValidation = Yup.object({
		email: Yup.string().email('Only valid emails'),
	});

	const renderError = (message) => (
		<p className='text-red-600 font-TecFont underline pb-1'>{message}</p>
	);

	const loginSubmit = (data) => {
		loginQuery({
			variables: {
				username: data.username,
				password: data.password,
			},
		}).then((resp) => {
			if (resp.data.login) {
				let status = resp.data.login.responseStatus;
				let token = resp.data.login.token;
				let response = resp.data.login.response;

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
						window.location.href = '/main';
					}, 1500);
				}
			}
		});
	};

	const registrationSubmit = async (data) => {
		registrationQuery({
			variables: {
				username: data.username,
				email: data.email,
				password: data.password,
				password_confirm: data.password_confirm,
			},
		}).then((resp) => {
			if (resp.data.registration) {
				let status = resp.data.registration.responseStatus;
				let response = resp.data.registration.response;

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

	const recPassSubmit = async (data) => {
		recPassQuery({
			variables: {
				email: data.email,
			},
		}).then((resp) => {
			if (resp.data.recPass) {
				let status = resp.data.recPass.responseStatus;
				let response = resp.data.recPass.response;

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
				className={
					'flex  z-50 h-screen w-screen m-0 p-0 bg-homepage-image justify-center bg-no-repeat justify-center items-center bg-cover'
				}>
				<Particles
					id='tsparticles'
					options={config_particles}
					className={'z-0'}
				/>
				<Box
					className={
						'flex py-0.5 rounded-md bg-homepage-login-border shadow-homepage-login-backdrop shadow-homepage-login justify-center items-center'
					}
					style={{
						clipPath:
							'polygon(0 0, 85% 0%, 100% 0, 100% 85%, 90% 100%, 0 100%)',
					}}>
					<Box
						className={
							'rounded-md bg-homepage-login-background py-5 px-10 '
						}
						style={{
							width: 'calc(100% - 2px)',
							height: 'calc(100% - 2px)',
							clipPath:
								'polygon(0 0, 85% 0%, 100% 0, 100% 85%, 90% 100%, 0 100%)',
						}}>
						{/*LOGO + NAME */}
						<Box
							className={
								'flex w-full items-center justify-center'
							}>
							<Logo />

							<Text
								className={
									'text-6xl m-3 font-TecFont text-homepage-login-text text-border'
								}>
								Corrupta
							</Text>
						</Box>

						<Box className={'w-full h-1/3 mt-5'}>
							{formContent === 'login' && (
								<Formik
									initialValues={loginInitialValues}
									validationSchema={loginSchemaValidation}
									onSubmit={loginSubmit}>
									<Form className={'text-center'}>
										<Box className='w-2/4 m-auto my-5'>
											<Field
												name='username'
												type='text'
												className='input w-full bg-transparent border-b border-homepage-login-border font-TecFont outline-0 text-homepage-login-border placeholder:text-homepage-login-border'
												placeholder='username'
											/>
											<ErrorMessage
												name='username'
												render={renderError}
											/>
										</Box>

										<Box className='w-2/4 m-auto my-5'>
											<Field
												name='password'
												type='password'
												className='input w-full bg-transparent border-b border-homepage-login-border font-TecFont outline-0 text-homepage-login-border placeholder:text-homepage-login-border'
												placeholder='Password'
											/>
											<ErrorMessage
												name='password'
												render={renderError}
											/>
										</Box>

										<Box
											className={
												'flex m-auto bg-homepage-login-border items-center justify-center'
											}
											style={{
												clipPath:
													'polygon(11% 0, 100% 0, 100% 59%, 89% 100%, 0 100%, 0 40%)',
												height: '30px',
												width: '200px',
											}}>
											<button
												type='submit'
												className={
													'text-center bg-homepage-login-background'
												}
												style={{
													width: 'calc(100% - 2px)',
													height: 'calc(100% - 2px)',
													clipPath:
														'polygon(11% 0, 100% 0, 100% 59%, 89% 100%, 0 100%, 0 40%)',
												}}>
												<Text
													className={
														'font-TecFont text-homepage-login-text text-border text-xl tracking-widest'
													}>
													Submit
												</Text>
											</button>
										</Box>
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
									<Form className={'text-center'}>
										<Box className='w-2/4 m-auto my-5'>
											<Field
												name='username'
												type='text'
												className='input w-full bg-transparent border-b border-homepage-login-border font-TecFont outline-0 text-homepage-login-border placeholder:text-homepage-login-border'
												placeholder='username'
											/>
											<ErrorMessage
												name='username'
												render={renderError}
											/>
										</Box>
										<Box className='w-2/4 m-auto my-5'>
											<Field
												name='email'
												type='email'
												className='input w-full bg-transparent border-b border-homepage-login-border font-TecFont outline-0 text-homepage-login-border placeholder:text-homepage-login-border'
												placeholder='email'
											/>
											<ErrorMessage
												name='email'
												render={renderError}
											/>
										</Box>

										<Box className='w-2/4 m-auto my-5'>
											<Field
												name='password'
												type='password'
												className='input w-full bg-transparent border-b border-homepage-login-border font-TecFont outline-0 text-homepage-login-border placeholder:text-homepage-login-border'
												placeholder='Password'
											/>
											<ErrorMessage
												name='password'
												render={renderError}
											/>
										</Box>

										<Box className='w-2/4 m-auto my-5'>
											<Field
												name='password_confirm'
												type='password'
												className='input w-full bg-transparent border-b border-homepage-login-border font-TecFont outline-0 text-homepage-login-border placeholder:text-homepage-login-border'
												placeholder='Password Confirm'
											/>
											<ErrorMessage
												name='password_confirm'
												render={renderError}
											/>
										</Box>

										<Box
											className={
												'flex m-auto bg-homepage-login-border items-center justify-center'
											}
											style={{
												clipPath:
													'polygon(11% 0, 100% 0, 100% 59%, 89% 100%, 0 100%, 0 40%)',
												height: '30px',
												width: '200px',
											}}>
											<button
												type='submit'
												className={
													'text-center bg-homepage-login-background'
												}
												style={{
													width: 'calc(100% - 2px)',
													height: 'calc(100% - 2px)',
													clipPath:
														'polygon(11% 0, 100% 0, 100% 59%, 89% 100%, 0 100%, 0 40%)',
												}}>
												<Text
													className={
														'font-TecFont text-homepage-login-text text-border text-xl tracking-widest'
													}>
													Submit
												</Text>
											</button>
										</Box>
									</Form>
								</Formik>
							)}
							{formContent === 'recPass' && (
								<Formik
									initialValues={recPassInitialValues}
									validationSchema={recPassSchemaValidation}
									onSubmit={recPassSubmit}>
									<Form className={'text-center'}>
										<Box className='w-2/4 m-auto my-5'>
											<Field
												name='email'
												type='email'
												className='input w-full bg-transparent border-b border-homepage-login-border font-TecFont outline-0 text-homepage-login-border placeholder:text-homepage-login-border'
												placeholder='Email'
											/>
											<ErrorMessage
												name='email'
												render={renderError}
											/>
										</Box>

										<Box
											className={
												'flex m-auto bg-homepage-login-border items-center justify-center'
											}
											style={{
												clipPath:
													'polygon(11% 0, 100% 0, 100% 59%, 89% 100%, 0 100%, 0 40%)',
												height: '30px',
												width: '200px',
											}}>
											<button
												type='submit'
												className={
													'text-center bg-homepage-login-background'
												}
												style={{
													width: 'calc(100% - 2px)',
													height: 'calc(100% - 2px)',
													clipPath:
														'polygon(11% 0, 100% 0, 100% 59%, 89% 100%, 0 100%, 0 40%)',
												}}>
												<Text
													className={
														'font-TecFont text-homepage-login-text text-border text-xl tracking-widest'
													}>
													Submit
												</Text>
											</button>
										</Box>
									</Form>
								</Formik>
							)}
						</Box>

						<Box
							className={
								'flex w-3/4 m-auto items-center justify-center text-center mt-5 text-homepage-login-border'
							}>
							{formContent !== 'registration' && (
								<Box className={'flex w-1/2 justify-center'}>
									<span
										className={
											'cursor-pointer hover:underline'
										}
										onClick={() =>
											setFormContent('registration')
										}>
										Registrati
									</span>
								</Box>
							)}

							{formContent !== 'login' && (
								<Box className={'flex w-1/2 justify-center'}>
									<span
										className={
											'cursor-pointer hover:underline'
										}
										onClick={() => setFormContent('login')}>
										Login
									</span>
								</Box>
							)}
							{formContent !== 'recPass' && (
								<Box className={'flex w-1/2 justify-center'}>
									<span
										className={
											'cursor-pointer hover:underline'
										}
										onClick={() =>
											setFormContent('recPass')
										}>
										Recupera Password
									</span>
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
