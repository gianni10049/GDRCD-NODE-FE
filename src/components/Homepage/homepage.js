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

const Homepage = () => {
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

	const renderError = (message) => (
		<p className='text-red-600 font-TecFont tracking-wide pb-1 font-bold'>
			{message}
		</p>
	);

	const loginSubmit = (data) => {
		GQLQuery(LOGIN, {
			username: data.username,
			password: data.password,
		}).then((resp) => {
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

	const registrationSubmit = async (data) => {
		GQLmutation(REGISTRATION, {
			username: data.username,
			email: data.email,
			password: data.password,
			password_confirm: data.password_confirm,
		}).then((resp) => {
			if (resp.registration) {
				let status = resp.registration.responseStatus;
				let response = resp.registration.response;

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
		GQLQuery(RECPASS, {
			email: data.email,
		}).then((resp) => {
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
				className={'h-screen w-screen bg-homepage-image'}>
				<Particles
					id='tsparticles'
					options={config_particles}
					className={'z-0'}
				/>
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
					className={'shadow-green-backdrop shadow-black-light'}>
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
								Corrupta
							</Text>
						</Box>

						<Box w={'full'} mt={5} className={'h-1/3'}>
							{formContent === 'login' && (
								<Formik
									initialValues={loginInitialValues}
									validationSchema={loginSchemaValidation}
									onSubmit={loginSubmit}>
									<Form textAlign={'center'}>
										<Box
											m={'auto'}
											my={5}
											className='w-2/4'>
											<Field
												name='username'
												type='text'
												className='input w-full bg-transparent border-b border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border
												focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light'
												placeholder='username'
											/>
											<ErrorMessage
												name='username'
												render={renderError}
											/>
										</Box>

										<Box
											m={'auto'}
											my={5}
											className='w-2/4'>
											<Field
												name='password'
												type='password'
												className='input w-full bg-transparent border-b border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border
												focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light'
												placeholder='Password'
											/>
											<ErrorMessage
												name='password'
												render={renderError}
											/>
										</Box>

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
													Submit
												</Text>
											</Button>
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
										<Box
											m={'auto'}
											my={5}
											className='w-2/4'>
											<Field
												name='username'
												type='text'
												className='input w-full bg-transparent border-b border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border
												focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light'
												placeholder='username'
											/>
											<ErrorMessage
												name='username'
												render={renderError}
											/>
										</Box>
										<Box
											m={'auto'}
											my={5}
											className='w-2/4'>
											<Field
												name='email'
												type='email'
												className='input w-full bg-transparent border-b border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border
												focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light'
												placeholder='email'
											/>
											<ErrorMessage
												name='email'
												render={renderError}
											/>
										</Box>

										<Box
											m={'auto'}
											my={5}
											className='w-2/4'>
											<Field
												name='password'
												type='password'
												className='input w-full bg-transparent border-b border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border
												focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light'
												placeholder='Password'
											/>
											<ErrorMessage
												name='password'
												render={renderError}
											/>
										</Box>

										<Box
											m={'auto'}
											my={5}
											className='w-2/4'>
											<Field
												name='password_confirm'
												type='password'
												className='input w-full bg-transparent border-b border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border
												focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light'
												placeholder='Password Confirm'
											/>
											<ErrorMessage
												name='password_confirm'
												render={renderError}
											/>
										</Box>

										<Box
											d={'flex'}
											m={'auto'}
											bg={'green.border'}
											alignItems={'center'}
											justifyContent={'center'}
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
													backgroundColor:
														'green.light',
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
													Submit
												</Text>
											</Button>
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
										<Box
											m={'auto'}
											my={5}
											className='w-2/4'>
											<Field
												name='email'
												type='email'
												className='input w-full bg-transparent border-b border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border
												focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light'
												placeholder='Email'
											/>
											<ErrorMessage
												name='email'
												render={renderError}
											/>
										</Box>

										<Box
											d={'flex'}
											m={'auto'}
											bg={'green.border'}
											alignItems={'center'}
											justifyContent={'center'}
											_hover={{
												bg: 'green.light',
											}}
											clipPath={
												'polygon(11% 0, 100% 0, 100% 59%, 89% 100%, 0 100%, 0 40%)'
											}
											w={'200px'}
											h={'30px'}>
											<Button
												textAlign={'center'}
												rounded={'none'}
												bg={'green.background'}
												type='submit'
												w={'calc(100% - 2px)'}
												h={'calc(100% - 2px)'}
												_hover={{
													backgroundColor:
														'green.light',
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
													Submit
												</Text>
											</Button>
										</Box>
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
										Registrati
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
										Login
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
										Recupera Password
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
