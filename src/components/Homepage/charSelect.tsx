import Particles from 'react-tsparticles';
import config_particles from '../Particles/homepage.json';
import { Box, Text, Tooltip, useToast } from '@chakra-ui/react';
import Logo from '../Utils/logo';
import { GQLQuery } from '../../apollo/GQL';
import { CHAR_LIST, SET_CHAR } from '../../apollo/Characters';
import { useEffect, useState } from 'react';
import React from 'react';
import { characterInterface } from './charSelect.model';
import { useTranslation } from 'react-i18next';

const CharacterSelect = () => {
	//TODO
	// - Valutare in futuro se bloccare l'accesso a questa pagina quando si e' gia' collegati con un pg. (Incasinamento localStorage)

	let [charList, setCharList] = useState<[characterInterface]>([{}]);
	const toast = useToast();
	const { t } = useTranslation();

	useEffect(() => {
		getCharactersList().then((data) => {
			setCharList(data.charactersList);
		});
	}, []);

	const getCharactersList = async () => {
		return await GQLQuery(CHAR_LIST, {});
	};

	const setCharacterQuery = async (id: number) => {
		return await GQLQuery(SET_CHAR, {
			characterId: id,
		});
	};

	const setCharacter = async (id: number) => {
		let data = await setCharacterQuery(id);

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

	/**
	 * @param item
	 * @param item.mini_avatar
	 * @param item.nickname
	 * @param item.surname
	 */
	return (
		<Box
			d={'flex'}
			h={'100vh'}
			w={'100vw'}
			m={0}
			p={0}
			backgroundRepeat={'no-repeat'}
			backgroundSize={'cover'}
			justifyContent={'center'}
			alignItems={'center'}
			userSelect={'none'}>
			{/*@ts-ignore*/}
			<Particles options={config_particles} />
			<Box
				rounded={'md'}
				d={'flex'}
				py={0.5}
				justifyContent={'center'}
				alignItems={'center'}
				bg={'green.border'}
				zIndex={50}
				clipPath={
					'polygon(0 0, 85% 0%, 100% 0, 100% 85%, 90% 100%, 0 100%)'
				}
				style={{
					boxShadow: '0 0 15px -5px rgba(0, 0, 0, 1)',
				}}>
				<Box
					rounded={'md'}
					bg={'green.background'}
					pt={5}
					pb={3}
					px={10}
					width={'calc(100% - 2px)'}
					height={'calc(100% - 2px)'}
					clipPath={
						'polygon(0 0, 85% 0%, 100% 0, 100% 85%, 90% 100%, 0 100%)'
					}>
					{/*LOGO + NAME */}
					<Box
						d={'flex'}
						w={'full'}
						alignItems={'center'}
						justifyContent={'center'}>
						<Box w={'20'}>
							<Logo />
						</Box>
						<Text
							color={'green.text'}
							fontSize={'6xl'}
							fontFamily={'TecFont'}
							letterSpacing={'wider'}
							m={3}
							_hover={{
								color: 'green.border',
							}}
							className={'text-border'}>
							{t('general.siteName')}
						</Text>
					</Box>

					<Box>
						<Box
							fontSize={'2xl'}
							textAlign={'center'}
							color={'green.light'}
							fontFamily={'TecFont'}>
							{t('charSelect.title')}
						</Box>
						{charList.map((item, i) => (
							<Box
								borderWidth={'1px'}
								borderColor={'green.border'}
								w={'full'}
								py={3}
								my={2}
								key={i}
								cursor={'pointer'}
								alignItems={'center'}
								_hover={{
									bg: 'green.text',
								}}
								d={'flex'}
								style={{
									boxShadow:
										'inset 0px 0px 10px -5px #000000',
								}}
								onClick={() => setCharacter(item.id)}>
								<Box
									w={20}
									borderWidth={'1px'}
									borderColor={'green.border'}
									ml={3}
									alignItems={'center'}
									style={{
										boxShadow:
											'0 0 15px -5px rgba(0, 0, 0, 1)',
									}}>
									<Box
										className={'ct-ratio-1-1'}
										backgroundSize={'cover'}
										backgroundPosition={'center center'}
										backgroundRepeat={'no-repeat'}
										backgroundImage={
											'url(' + item.mini_avatar + ')'
										}
									/>
								</Box>
								<Box
									w={'full'}
									ml={5}
									alignItems={'center'}
									flexWrap={'wrap'}
									textAlign={'center'}
									fontFamily={'TecFont'}
									d={'flex'}>
									<Box
										my={1}
										w={'full'}
										color={'green.light'}>
										<Box fontSize={'xl'}>
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
							label={t('charSelect.createTooltip')}
							bg={'green.text'}>
							<Box
								borderWidth={'1px'}
								borderColor={'green.border'}
								m={'auto'}
								py={1}
								mt={2}
								cursor={'pointer'}
								textAlign={'center'}
								color={'green.light'}
								alignItems={'center'}
								_hover={{
									bg: 'green.text',
								}}
								style={{
									boxShadow:
										'inset 0px 0px 10px -5px #000000',
								}}
								className={'w-1/2'}>
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
