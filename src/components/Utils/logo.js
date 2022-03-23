import { Box } from '@chakra-ui/react';
import homepage_logo from '../../static/images/logo/logo2.png';

const Logo = (props) => {
	let { className } = props;

	return (
		<Box
			rounded={'full'}
			border={'1px solid rgba(16,164,120,0.73)'}
			bg={'rgba(6,52,38,0.73)'}
			boxShadow={'inset 0px 0px 10px -5px #000000'}
			className={className}>
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
