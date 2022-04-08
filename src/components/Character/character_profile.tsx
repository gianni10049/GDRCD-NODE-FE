import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GQLQuery } from '../../apollo/GQL';
import { GET_CHAR } from '../../apollo/Characters';
import { characterProfileData } from './character_profile.model';

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
						width={'20%'}
						minH={'500px'}
						maxH={'600px'}
						height={'80%'}
						borderColor={'green.light'}
						rounded={'2xl'}
						overflow={'hidden'}
						borderWidth={'2px'}
						borderStyle={'solid'}>
						<Image
							w={'full'}
							h={'full'}
							objectFit={'cover'}
							objectPosition={'center'}
							src={characterData.profilePic}
						/>
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
									<Text
										_hover={{
											color: 'green.light',
										}}
										color={'green.border'}
										fontFamily={'PaintFont'}
										fontSize={30}
										h={'full'}
										px={2}>
										"{characterData.nickname}"
									</Text>
								)}
								{characterData.surname}
							</Flex>
						</Box>
						<Box flex={1} w={'full'} overflowY={'scroll'}>
							<Box h={'1200px'} />
						</Box>
					</Box>
				</Flex>
			)}
		</Box>
	);
};

export default CharacterProfile;
