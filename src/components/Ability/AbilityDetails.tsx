import React, { useCallback, useEffect, useState } from 'react';
import { Box, Icon, Collapse, SimpleGrid, Text } from '@chakra-ui/react';
import { AbilityDetailsData } from './AbilityDetails.modal';
import { GQLQuery } from '../../apollo/GQL';
import { GET_ABILITY } from '../../apollo/Ability';
import { abilityTableData } from '../../apollo/Tables.model';
import { useTranslation } from 'react-i18next';
import { getIcon } from '../Utils/Icons';
import {
	calcDefaultAbilityBonus,
	calcDefaultAbilityPrice,
} from '../Utils/Generals';
import { PopoverInfo } from '../Utils/Popover';

export const AbilityDetails = (props: AbilityDetailsData) => {
	let { abilityId, characterId } = props.options;
	let [abilityData, setAbilityData] = useState<abilityTableData>(null);
	let [opened, setOpened] = useState<any>({});

	const { t } = useTranslation();

	const getAbility = useCallback<any>(async () => {
		return await GQLQuery(GET_ABILITY, {
			abilityId: abilityId,
			characterId: characterId,
		});
	}, [abilityId, characterId]);

	useEffect(() => {
		getAbility().then((resp: any) => {
			setAbilityData(resp.getAbility);
		});
	}, [getAbility]);

	const toggleSubMenu = (id: number) => {
		let new_array = {
			...opened,
		};

		if (opened[id]) {
			new_array[id] = !new_array[id];
		} else {
			new_array[id] = true;
		}

		setOpened(new_array);
	};

	const createDetails = () => {
		const lvl_max = abilityData.max_level,
			data = [];

		for (let i = 1; i <= lvl_max; i++) {
			let level_data: any = {
				id: i,
				level: i,
			};

			let finded = abilityData.abilityToDetailData.find(
				(item) => item.level === i
			);

			if (finded) {
				level_data = {
					...level_data,
					price: finded.price,
					description: finded.description,
					bonus: finded.bonus,
				};
			}

			if (abilityData.characterAbilityData.length) {
				level_data = {
					...level_data,
					char_level: abilityData.characterAbilityData[0].value,
				};
			}

			data.push(level_data);
		}

		return (
			<>
				{data.map((levelDetail, i) => (
					<Box key={i}>
						<Box
							cursor={'pointer'}
							textTransform={'uppercase'}
							textAlign={'center'}
							fontSize={20}
							mx={'auto'}
							mt={5}
							color={'green.textLight'}
							_hover={{
								bgColor: 'green.border',
								color: 'white',
							}}
							transition={'0.2s all'}
							bg={
								levelDetail.char_level >= levelDetail.level
									? 'green.lightOpacity'
									: 'green.backgroundDark'
							}
							borderColor={'green.light'}
							borderStyle={'solid'}
							borderWidth={1}
							onClick={() => toggleSubMenu(levelDetail.id)}
							fontFamily={'TecFont'}>
							{t('charactersProfile.tabStats.abiLevelsText')}{' '}
							{levelDetail.level}
						</Box>
						<Collapse
							in={opened[levelDetail.id] ?? false}
							animateOpacity>
							<Box
								borderColor={'green.light'}
								borderStyle={'solid'}
								borderWidth={'0 1px 1px 1px'}
								bg={'green.lightOpacity'}
								fontFamily={'TecFont'}
								textAlign={'left'}
								color={'green.textLight'}>
								<Text p={3}>
									{levelDetail?.description?.it ?? ''}
								</Text>
								<SimpleGrid
									fontFamily={'TecFont'}
									textAlign={'center'}
									mt={2}
									borderTop={'1px solid'}
									borderColor={'green.light'}
									columns={2}
									py={2}>
									<Box>
										<Text>Prezzo:</Text>
										<Text>
											{levelDetail.price ??
												calcDefaultAbilityPrice(
													levelDetail.level
												)}
										</Text>
									</Box>
									<Box>
										<Text>Bonus:</Text>
										<Text>
											{levelDetail.bonus ??
												calcDefaultAbilityBonus(
													levelDetail.level
												)}
										</Text>
									</Box>
								</SimpleGrid>
							</Box>
						</Collapse>
					</Box>
				))}
			</>
		);
	};

	return (
		<Box w={'full'} h={'full'} pos={'relative'} overflowX={'hidden'}>
			<Box pos={'absolute'} top={1} right={1}>
				<PopoverInfo
					title={t('ability.abilityDetailsTitle')}
					content={t('ability.abilityDetailsText')}
				/>
			</Box>
			{abilityData && (
				<>
					<Box
						textAlign={'center'}
						fontSize={25}
						color={'green.textLight'}>
						<Icon
							color={'white'}
							pointerEvents={'none'}
							as={getIcon({ icon: abilityData.icon })}
							boxSize={8}
							pos={'relative'}
							zIndex={2}
							mr={2}
						/>
						{/*@ts-ignore*/}
						{t(`general.ability.${abilityData.name}`)}
					</Box>
					<Box
						w={'90%'}
						m={'0 auto'}
						border={'1px solid'}
						borderColor={'green.light'}
						my={2}
						fontSize={20}
						fontFamily={'RegularText'}
						color={'green.textLight'}
						py={2}
						px={5}>
						{abilityData.description.it}
					</Box>

					<Box>{abilityData && createDetails()}</Box>
				</>
			)}
		</Box>
	);
};
