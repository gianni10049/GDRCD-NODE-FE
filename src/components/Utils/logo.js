import { Box, Image } from '@chakra-ui/react';
import homepage_logo from '../../static/images/logo/logo2.png';

const Logo = (props) => {
	let { width, heigth, className } = props;

	width = width ?? 'w-20';
	heigth = heigth ?? 'h-20';

	return (
		<Box
			className={`flex ${width} ${heigth} overflow-hidden rounded-full border border-homepage-login-border  items-center justify-center text-red-600 shadow-homepage-logo ${className}`}>
			<Image
				src={homepage_logo}
				className={'w-9/12 h-9/12 text-red-600 opacity-60'}
			/>
		</Box>
	);
};

export default Logo;
