module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'TecFont': 'TecFont',
			},
			backgroundImage: {
				'homepage-image':
					"url('./../images/homepage/homepage-image.png')",
			},
			backgroundSize: {
				'50%': '80%',
				'16': '4rem',
			},
			colors: {
				'homepage-login': {
					background: 'rgba(6,52,38,0.73)',
					border: 'rgba(16,164,120,0.73)',
					text: 'rgba(6,52,38,0.73)',
					light: 'rgb(17,203,148)',
					backdrop: 'rgba(53, 203, 0, 0.5)',
				},
			},
			boxShadow: {
				'homepage-login': '0 0 80px -12px rgba(0, 0, 0, 0.3)',
				'homepage-logo': 'inset 0px 0px 10px -5px #000000',
			},
		},
	},
	plugins: [],
};
