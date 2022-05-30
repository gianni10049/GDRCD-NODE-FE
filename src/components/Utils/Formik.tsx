import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { fieldData, renderSelectInput, submitData } from './Formik.model';
import { Field, ErrorMessage } from 'formik';

export const CreateSingleInput = (props: fieldData) => {
	if (props.type !== 'select') {
		return (
			<Box m={'auto'} mb={3} mt={1} w={props.width ?? '50%'}>
				<Field
					name={props.name}
					type={props.type ?? 'text'}
					className={`input w-full bg-transparent border-b border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border
					focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light`}
					placeholder={props.placeholder}
				/>
				{/* @ts-ignore*/}
				<ErrorMessage name={props.name} render={renderError} />
			</Box>
		);
	} else {
		return (
			<Box m={'auto'} mb={3} mt={1} className='w-2/4'>
				<Field
					name={props.name}
					as={'select'}
					className={`input w-full bg-transparent border-b border-green-border font-TecFont outline-0 text-green-border placeholder:text-green-border
					focus:text-green-light focus:placeholder:text-green-light hover:placeholder:text-green-light`}
					placeholder={props.placeholder}>
					<RenderSelect
						value={props.fieldValue}
						label={props.fieldLabel}
						data={props.fields}
						placeholder={props.placeholder}
					/>
				</Field>
				{/* @ts-ignore*/}
				<ErrorMessage name={props.name} render={renderError} />
			</Box>
		);
	}
};

export const RenderSelect = (props: renderSelectInput) => {
	let { data, value, label, placeholder } = props;

	if (data) {
		return (
			<>
				<option value=''>{placeholder}</option>
				{data.map((row: any) => {
					if (row[value] && row[label]) {
						return <option value={row[value]}>{row[label]}</option>;
					} else {
						return '';
					}
				})}
			</>
		);
	} else {
		return <></>;
	}
};

export const CreateSubmitInput = (props: submitData) => {
	let { label } = props;

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
					{label ?? 'submit'}
				</Text>
			</Button>
		</Box>
	);
};

export const renderError = (message: string) => (
	<Box
		pb={1}
		fontWeight={'bold'}
		color={'red.600'}
		fontFamily={'TecFont'}
		letterSpacing={'wide'}>
		<Text>{message}</Text>
	</Box>
);
