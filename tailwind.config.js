module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'homepage-image': "url('./images/homepage.gif')",
				'homepage-first-step': "url('./images/first_step.gif')",
			},
			backgroundSize: {
				'50%': '80%',
				'16': '4rem',
			},
		},
	},
	plugins: [],
};
