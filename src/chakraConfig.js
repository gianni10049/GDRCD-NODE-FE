import { extendTheme } from '@chakra-ui/react';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
	fontFamily: {
		'TecFont': 'TecFont',
	},
	backgroundImage: {
		'homepage-image': "url('./../images/homepage/homepage-image.png')",
	},
	backgroundSize: {
		'50%': '80%',
		'16': '4rem',
	},
	colors: {
		'green': {
			background: 'rgba(6,52,38,0.73)',
			border: 'rgba(16,164,120,0.73)',
			text: 'rgba(6,52,38,0.73)',
			textLight: 'rgba(193,215,199,1)',
			light: 'rgb(17,203,148)',
			backdrop: 'rgba(53, 203, 0, 0.5)',
			backgroundDark: '#2f3e46',
		},
	},
	textShadow: {
		'light':
			'1px 0 0 rgb(17,203,148), -1px 0 0 rgb(17,203,148), 0 1px 0 rgb(17,203,148), 0 -1px 0 rgb(17,203,148), 1px 1px rgb(17,203,148), -1px -1px 0 rgb(17,203,148), 1px -1px 0 rgb(17,203,148), -1px 1px 0 rgb(17,203,148)',
	},
	boxShadow: {
		'black-light': '0 0 15px -5px rgba(0, 0, 0, 1)',
		'black-inset': 'inset 0px 0px 10px -5px #000000',
	},
});

export default theme;
