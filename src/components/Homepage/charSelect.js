import Particles from 'react-tsparticles';
import config_particles from '../Particles/homepage.json';
import { Box, Text, Tooltip, useToast } from '@chakra-ui/react';
import Logo from '../Utils/logo';
import { GQLQuery } from '../../apollo/GQL';
import { CHAR_LIST, SET_CHAR } from '../../apollo/Characters';
import { useEffect, useState } from 'react';

const CharacterSelect = () => {
	//TODO
	// - Valutare in futuro se bloccare l'accesso a questa pagina quando si e' gia' collegati con un pg. (Incasinamento localStorage)

	let [charList, setCharList] = useState([]);
	const toast = useToast();

	useEffect(() => {
		getCharactersList().then((data) => {
			setCharList(data.charactersList);
		});
	}, []);

	const getCharactersList = async () => {
		return await GQLQuery(CHAR_LIST, {});
	};

	const setCharacter = async (id) => {
		let data = await GQLQuery(SET_CHAR, {
			characterId: Number(id),
		});

		if (data.setCharacter.responseStatus === 'success') {
			localStorage.setItem('token', data.setCharacter.token);

			toast({
				title: data.setCharacter.response,
				status: data.setCharacter.responseStatus,
				duration: 9000,
				isClosable: true,
			});

			setTimeout(() => {
				window.location.href = '/main';
			}, 1500);
		}
	};

	return (
		<Box
			className={
				'flex h-screen w-screen m-0 p-0 bg-homepage-image justify-center bg-no-repeat justify-center items-center bg-cover select-none'
			}>
			<Particles
				id='tsparticles'
				options={config_particles}
				className={'z-0'}
			/>
			<Box
				className={
					'flex z-50 py-0.5 rounded-md bg-homepage-login-border shadow-homepage-login-backdrop shadow-homepage-login justify-center items-center'
				}
				style={{
					clipPath:
						'polygon(0 0, 85% 0%, 100% 0, 100% 85%, 90% 100%, 0 100%)',
				}}>
				<Box
					className={
						'rounded-md bg-homepage-login-background pt-5 pb-3 px-10 '
					}
					style={{
						width: 'calc(100% - 2px)',
						height: 'calc(100% - 2px)',
						clipPath:
							'polygon(0 0, 85% 0%, 100% 0, 100% 85%, 90% 100%, 0 100%)',
					}}>
					{/*LOGO + NAME */}
					<Box className={'flex w-full items-center justify-center'}>
						<Logo
							className={
								'hover:bg-homepage-login-text hover:border-homepage-login-border'
							}
						/>

						<Text
							className={
								'text-6xl m-3 font-TecFont text-homepage-login-text text-border hover:text-homepage-login-border tracking-wider'
							}>
							Corrupta
						</Text>
					</Box>

					<Box>
						<Box
							className={
								'text-2xl text-center text-homepage-login-light font-TecFont'
							}>
							Select a character:
						</Box>
						{charList.map((item, i) => (
							<Box
								key={i}
								className={
									'flex border border-homepage-login-border w-full py-3 my-2 shadow-homepage-logo items-center hover:bg-homepage-login-text cursor-pointer'
								}
								onClick={() => setCharacter(item.id)}>
								<Box
									className={
										'w-20 border border-homepage-login-border ml-3 shadow-homepage-login items-center'
									}>
									<Box
										className={'ct-ratio-1-1'}
										backgroundSize={'cover'}
										backgroundPosition={'center center'}
										backgroundRepeat={'no-repeat'}
										backgroundImage={
											'url(' + item.miniavatar + ')'
										}
									/>
								</Box>
								<Box
									className={
										'flex w-full ml-5 items-center flex-wrap text-center font-TecFont'
									}>
									<Box
										className={
											'my-1 w-full text-homepage-login-light'
										}>
										<Box className={'text-xl'}>
											{item.name}{' '}
											{item.nickname
												? `"${item.nickname}"`
												: ''}{' '}
											{item.surname}
										</Box>
									</Box>
								</Box>
							</Box>
						))}
						<Tooltip
							label={'Create new character'}
							bg={'rgba(6,52,38,1)'}>
							<Box
								className={
									'border border-homepage-login-border w-1/2 m-auto py-1 mt-2 shadow-homepage-logo items-center ' +
									'hover:bg-homepage-login-text cursor-pointer text-center text-homepage-login-light'
								}>
								+
							</Box>
						</Tooltip>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default CharacterSelect;
