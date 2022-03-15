import { Box } from '@chakra-ui/react';
import GlitchClip from 'react-glitch-effect/core/GlitchClip';
import { useState } from 'react';
let first_step_image = require('./../../images/first_step.gif');
let second_step_image = require('./../../images/second_step.gif');
let third_step_image = require('./../../images/third_step.gif');

const Homepage = () => {
	const [isDisabled, setIsDisabled] = useState(true);
	const [step, setStep] = useState(1);

	const toggleGlitch = () => {
		setIsDisabled(false);
		setStep(2);
		setTimeout(() => {
			setIsDisabled(true);
			setTimeout(() => {
				setIsDisabled(false);
				setStep(3);
				setTimeout(() => {
					setIsDisabled(true);
				}, 1000);
			}, 3000);
		}, 1000);
	};

	return (
		<Box
			className={
				'flex h-screen w-screen m-0 p-0 bg-black justify-center bg-no-repeat bg-homepage-image bg-center justify-center items-center bg-50%'
			}>
			<Box
				className={
					'flex w-2/6 h-2/3 border border-red-50 bg-white cursor-pointer'
				}
				onClick={toggleGlitch}>
				<GlitchClip
					disabled={isDisabled}
					duration={1000}
					className={
						'flex w-full h-full justify-center items-center bg-[#120D14]'
					}>
					{step === 1 && (
						<img
							src={first_step_image}
							className={'w-full h-full'}
							alt={'first_step_image'}
						/>
					)}
					{step === 2 && (
						<img
							src={second_step_image}
							className={'w-full h-full'}
							alt={'second_step_image'}
						/>
					)}
					{step === 3 && (
						<img
							src={third_step_image}
							className={'w-full h-full'}
							alt={'third_step_image'}
						/>
					)}
				</GlitchClip>
			</Box>
		</Box>
	);
};

export default Homepage;
