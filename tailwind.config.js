module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'TecFont': 'TecFont',
			},
			colors: {
				'green': {
					background: 'rgba(6,52,38,0.73)',
					border: 'rgba(16,164,120,0.73)',
					text: 'rgba(6,52,38,1)',
					textLight: 'rgba(193,215,199,1)',
					light: 'rgb(17,203,148)',
					lightOpacity: 'rgba(17,203,148,0.3)',
					backdrop: 'rgba(53, 203, 0, 0.5)',
					backgroundDark: '#2f3e46',
				},
				'yellow': {
					bg: 'gold',
					text: '#998600',
				},
				'popover': {
					info: 'rgba(255,255,255,0.7)',
				},
				'red': {
					opacity: 'rgba(143,59,59,0.5)',
				},
			},
		},
	},
	plugins: [],
};
