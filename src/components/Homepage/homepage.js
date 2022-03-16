import { Box, Text } from '@chakra-ui/react';
import Logo from '../Utils/logo';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLazyQuery } from '@apollo/client';
import REGISTRATION from '../Utils/Apollo';

const Homepage = () => {
	const [registrationQuery] = useLazyQuery(REGISTRATION);

	let loginInitialValues = {
		username: '',
		password: '',
	};
	const loginSchemaValidation = Yup.object({
		username: Yup.string().required('required'),
		password: Yup.string().required('required'),
	});

	const loginSubmit = (values) => {
		alert(JSON.stringify(values, null, 2));
	};

	const renderError = (message) => (
		<p className='text-red-600 font-TecFont underline pb-1'>{message}</p>
	);

	const registration = async () => {
		registrationQuery().then((val) => {
			console.log(val.data);
		});
	};

	return (
		<Box
			className={
				'flex h-screen w-screen m-0 p-0 bg-homepage-image justify-center bg-no-repeat justify-center items-center bg-cover'
			}>
			<Box
				className={
					'flex py-0.5 rounded-md bg-homepage-login-border shadow-homepage-login-backdrop shadow-homepage-login justify-center items-center'
				}
				onClick={registration}
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
					<Box className={'flex w-full items-center justify-center'}>
						<Logo />
						<Text
							className={
								'text-6xl m-3 font-TecFont text-homepage-login-text text-border'
							}>
							Corrupta
						</Text>
					</Box>

					<Box className={'w-full h-1/3 mt-5'}>
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
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Homepage;
