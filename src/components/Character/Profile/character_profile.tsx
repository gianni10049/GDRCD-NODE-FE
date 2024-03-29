import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getCharacterData } from '../../../apollo/Characters';
import { characterProfileData } from './character_profile.model';
import CharacterMainPage from './character_mainpage';
import { PopoverCustom, PopoverInfo } from '../../Utils/Popover';
import { characterTableData } from '../../../apollo/Characters.model';
import default_image from '../../../static/images/characters/default-img.png';
import { useTranslation } from 'react-i18next';

const CharacterProfile = (props: characterProfileData) => {
	let { options } = props;

	let [characterData, setCharacterData] = useState<characterTableData>({});
	let [charId] = useState<number>(options?.character);
	const { t } = useTranslation();

	useEffect(() => {
		getCharacterData({
			characterId: charId,
		}).then((resp) => {
			setCharacterData(resp.getCharacter);
		});
	}, [charId]);

	return (
		<Box w={'full'} h={'full'} color={'white'} p={2}>
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
								title={t(
									'charactersProfile.imageTooltip.title'
								)}
								content={t(
									'charactersProfile.imageTooltip.text'
								)}
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
								src={
									characterData.profilePic
										? characterData.profilePic
										: default_image
								}
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
										title={t(
											'charactersProfile.profileTooltip.title'
										)}
										content={t(
											'charactersProfile.profileTooltip.text'
										)}
										contentAlign={'left'}
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
