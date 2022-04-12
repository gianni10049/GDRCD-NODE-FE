module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'TecFont': 'TecFont',
			},
			colors: {
				//TODO SOSTITUIRE E RIMUOVERE CON CHAKRA
				'green': {
					border: 'rgba(16,164,120,0.73)',
					light: 'rgb(17,203,148)',
				},
			},
		},
	},
	plugins: [],
};
