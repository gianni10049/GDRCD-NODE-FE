import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GQLQuery } from '../../apollo/GQL';
import { GET_CHAR } from '../../apollo/Characters';
import { characterProfileData } from './character_profile.model';
import CharacterMainPage from './character_mainpage';
import { PopoverCustom, PopoverInfo } from '../Utils/Popover';

const CharacterProfile = (props: characterProfileData) => {
	let { options } = props,
		charId = options?.character;

	let [characterData, setCharacterData]: any = useState({});

	const getCharacterData = async (id: number) => {
		return await GQLQuery(GET_CHAR, {
			characterId: id,
		});
	};

	useEffect(() => {
		getCharacterData(charId).then((resp) => {
			setCharacterData(resp.getCharacter);
		});
	});

	return (
		<Box w={'full'} h={'full'} color={'white'}>
			{characterData && (
				<Flex h={'full'} alignItems={'center'} justifyItems={'center'}>
					{/*PIC*/}
					<Box
						minW={'100px'}
						maxW={'300px'}
						width={'25%'}
						minH={'500px'}
						maxH={'600px'}
						height={'80%'}
						pos={'relative'}
						borderStyle={'solid'}>
						<Box pos={'absolute'} top={1} right={1}>
							<PopoverInfo
								title={'Immagine del personaggio'}
								content={
									"L'immagine deve rappresentare un personaggio umano. \n\n Sono ammesse foto e disegni che mostrino chiaramente il viso del personaggio. \n\n La dimensione massima e' di '300x600' mentre quella minima e' di '100x500'"
								}
							/>
						</Box>
						<Box
							w={'full'}
							h={'full'}
							overflow={'hidden'}
							borderColor={'green.light'}
							borderWidth={'1px'}
							rounded={'2xl'}>
							<Image
								w={'full'}
								h={'full'}
								objectFit={'cover'}
								objectPosition={'center'}
								src={characterData.profilePic}
							/>
						</Box>
					</Box>

					{/*RIGHT*/}
					<Box
						d={'flex'}
						overflow={'hidden'}
						borderColor={'green.light'}
						borderStyle={'solid'}
						borderWidth={'1px'}
						bg={'green.backgroundDark'}
						flexFlow={'column'}
						w={'full'}
						h={'full'}
						rounded={'md'}
						ml={3}>
						{/*NAME*/}
						<Box
							maxH={'45px'}
							flex={1}
							borderColor={'green.light'}
							borderStyle={'solid'}
							borderBottomWidth={'1px'}
							fontFamily={'TecFont'}
							fontSize={20}>
							<Flex
								h={'full'}
								justifyContent={'center'}
								alignItems={'center'}>
								{characterData.name}{' '}
								{characterData.nickname && (
									<PopoverCustom
										placement={'top'}
										buttonText={`"${characterData.nickname}"`}
										content={
											'Test testo per prova fama test.'
										}
										title={characterData.nickname}
										buttonTextSize={30}
										buttonTextColor={'green.border'}
										buttonTextColorHover={'green.light'}
									/>
								)}
								{characterData.surname}
								<Box justifySelf={'end'}>
									<PopoverInfo
										title={'Profilo del personaggio'}
										content={
											'Questa finestra mostra le informazioni principali del personaggio.'
										}
									/>
								</Box>
							</Flex>
						</Box>
						<Box flex={1} w={'full'} overflowY={'auto'}>
							<CharacterMainPage characterData={characterData} />
						</Box>
					</Box>
				</Flex>
			)}
		</Box>
	);
};

export default CharacterProfile;
