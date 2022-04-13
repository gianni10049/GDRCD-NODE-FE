import { Box } from '@chakra-ui/react';
import React from 'react';
import homepage_logo from '../../static/images/logo/logo2.png';
import { LogoData } from './logo.model';

const Logo = (props: LogoData) => {
	let { className } = props;

	return (
		<Box
			rounded={'full'}
			border={'1px solid'}
			borderColor={'green.border'}
			bg={'green.background'}
			boxShadow={'inset 0px 0px 10px -5px #000000'}
			_hover={{
				bg: 'green.text',
				border: '1px solid',
				borderColor: 'green.border',
			}}
			className={`${className}`}>
			<Box
				className={'ct-ratio-1-1'}
				backgroundSize={'70% auto'}
				backgroundPosition={'center center'}
				backgroundRepeat={'no-repeat'}
				backgroundImage={'url(' + homepage_logo + ')'}
			/>
		</Box>
	);
};

export default Logo;
