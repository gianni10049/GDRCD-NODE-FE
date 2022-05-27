import React, { useCallback, useEffect, useState } from 'react';
import { characterHealthData } from './character_healt.model';
import { getDamageListByPart, getPartsList } from '../../../apollo/Generic';
import {
	Box,
	SimpleGrid,
	Icon,
	Tooltip,
	Text,
	useToast,
} from '@chakra-ui/react';
import { getIcon } from '../../Utils/Icons';
import { useTranslation } from 'react-i18next';
import { characterDamageTableData } from '../../../apollo/Tables.model';
import { toggleDamageDetailModal } from '../../../redux/damageDetailsModal';
import { useDispatch } from 'react-redux';
import { AiOutlineReload, AiOutlineEye } from 'react-icons/ai';
import { getCharacterPercentages } from '../../../apollo/Characters';

export const CharHealthTab = (props: characterHealthData) => {
	const { characterData } = props;

	const [partsData, setPartsData] = useState<any>(false);
	const [partDamage, setPartDamage] = useState<any>(false);
	const [lifePercentage, setlifePercentage] = useState<number>(0);
	const { t } = useTranslation();
	const toast = useToast();
	const dispatch = useDispatch();

	const calcPercentage = useCallback(
		(part: any) => {
			let total = 0,
				max_points_calc = Math.floor(
					part.max_points + (part.max_points / 100) * lifePercentage
				);

			part.partDamages.forEach((damage: any) => {
				total += damage.points;
			});

			let percentage = Math.floor(
				(100 / max_points_calc) * (max_points_calc - total)
			);

			return {
				percentage,
				remained: max_points_calc - total,
				max_points_calc,
				color: calcColor(percentage),
			};
		},
		[lifePercentage]
	);

	const calcColor = (percentage: any) => {
		switch (true) {
			case percentage >= 100:
				return 'rgba(46, 204, 113,0.6)';
			case percentage >= 75 && percentage < 100:
				return 'rgba(102, 204, 153,0.6)';
			case percentage >= 50 && percentage < 75:
				return 'rgba(255, 255, 159,0.6)';
			case percentage >= 25 && percentage < 50:
				return 'rgba(196, 77, 86,0.6)';
			case percentage < 25:
				return 'rgba(150,150,150,0.6)';
		}
	};

	const loadPartDamage = async (part: number) => {
		getDamageListByPart({
			characterId: characterData.id,
			partId: part,
		}).then((resp) => {
			if (resp.getCharDamageByPart.damages.length > 0) {
				setPartDamage(resp.getCharDamageByPart.damages);
			} else {
				toast({
					title: t('charactersProfile.tabHealth.noDamage'),
					status: 'info',
					duration: 9000,
					isClosable: true,
				});
				setPartDamage(null);
			}
		});
	};

	const refetchData = useCallback(async () => {
		setPartDamage(null);
		getCharacterPercentages({ characterId: characterData.id }).then(
			(resp) => {
				setlifePercentage(
					resp.getCharacterActionPercentages?.percentages?.life_calc
						?.total
				);
			}
		);

		getPartsList({ characterId: characterData.id }).then((resp) => {
			let parts = resp.getPartsList.table.map((part: any) => {
				let new_obj = { ...part };
				new_obj.percentage = calcPercentage(part);
				return new_obj;
			});

			setPartsData(parts);
		});
	}, [calcPercentage, characterData]);

	useEffect(() => {
		refetchData().then(() => {});
	}, [refetchData]);

	return (
		<>
			<Tooltip
				hasArrow
				label={t('ability.refetchData')}
				bg={'green.light'}
				color={'green.text'}
				fontSize={'md'}
				fontFamily={'TecFont'}
				letterSpacing={'widest'}
				fontWeight={'extrabold'}>
				<Box
					pos={'fixed'}
					mt={-95}
					right={5}
					w={7}
					h={7}
					cursor={'pointer'}
					justifyContent={'center'}
					alignItems={'center'}
					d={'flex'}
					bg={'white'}
					zIndex={2}
					color={'green.light'}
					rounded={'full'}>
					<Icon
						as={AiOutlineReload}
						boxSize={5}
						onClick={refetchData}
					/>
				</Box>
			</Tooltip>
			{partsData && (
				<Box
					fontFamily={'TecFont'}
					textAlign={'center'}
					mt={2}
					py={2}
					justifyContent={'center'}
					d={'flex'}
					flexWrap={'wrap'}>
					{partsData.map((part: any, i: number) => (
						<Tooltip
							key={i}
							hasArrow
							label={
								// @ts-ignore
								t('general.bodyParts.' + part.name) +
								` ${part.percentage.remained}/${part.percentage.max_points_calc}`
							}
							bg={'green.light'}
							color={'green.text'}
							fontSize={'md'}
							placement={'top'}
							fontFamily={'TecFont'}
							letterSpacing={'widest'}
							fontWeight={'extrabold'}>
							<Box
								mx={4}
								my={2}
								bg={'transparent'}
								border={'1px solid'}
								borderColor={part.color}
								w={12}
								h={12}
								d={'flex'}
								justifyContent={'center'}
								alignItems={'center'}
								cursor={'pointer'}
								overflow={'hidden'}
								_hover={{
									bg: 'green.border',
								}}
								pos={'relative'}
								rounded={'full'}
								onClick={() => loadPartDamage(part.id)}>
								<Icon
									color={'green.textLight'}
									pointerEvents={'none'}
									as={getIcon({ icon: part.icon })}
									boxSize={8}
									pos={'relative'}
									zIndex={2}
								/>
								<Box
									w={'full'}
									h={part.percentage.percentage + `%`}
									bg={part.percentage.color}
									pos={'absolute'}
									pointerEvents={'none'}
									bottom={0}
									zIndex={1}
								/>
								{part.partDamages.length > 0 && (
									<Box
										pos={'absolute'}
										zIndex={99}
										color={'green.light'}
										bg={'green.backgroundDark'}
										w={5}
										h={5}
										rounded={'full'}
										border={'1px solid'}
										borderColor={'green.border'}
										bottom={0}>
										{part.partDamages.length}
									</Box>
								)}
							</Box>
						</Tooltip>
					))}
				</Box>
			)}
			{partDamage && (
				<>
					<SimpleGrid
						fontFamily={'TecFont'}
						textAlign={'center'}
						mt={1}
						border={'1px solid'}
						borderColor={'green.light'}
						w={'98%'}
						mx={'auto'}
						columns={3}>
						<Box py={2} overflow={'hidden'}>
							<Text>Titolo</Text>
						</Box>
						<Box py={2} overflow={'hidden'}>
							<Text>Punti Ferita</Text>
						</Box>
						<Box py={2} overflow={'hidden'}>
							<Text>Comandi</Text>
						</Box>
					</SimpleGrid>
					<Box
						w={'98%'}
						minHeight={'200px'}
						m={'0 auto'}
						overflow={'auto'}
						border={'1px solid'}
						borderColor={'green.light'}>
						{partDamage.map(
							(damage: characterDamageTableData, i: number) => (
								<SimpleGrid
									key={i}
									fontFamily={'TecFont'}
									textAlign={'center'}
									mt={1}
									border={'1px solid'}
									borderColor={'green.light'}
									fontSize={13}
									w={'98%'}
									mx={'auto'}
									columns={3}>
									<Box py={2} overflow={'hidden'}>
										<Text>{damage.title}</Text>
									</Box>
									<Box py={2} overflow={'hidden'}>
										<Text>{damage.points}</Text>
									</Box>
									<Box py={2} overflow={'hidden'}>
										<Tooltip
											hasArrow
											label={t(
												'charactersProfile.tabHealth.watch'
											)}
											bg={'green.light'}
											color={'green.text'}
											fontSize={'md'}
											fontFamily={'TecFont'}
											letterSpacing={'widest'}
											fontWeight={'extrabold'}>
											<Box>
												<Icon
													as={AiOutlineEye}
													boxSize={5}
													cursor={'pointer'}
													_hover={{
														color: 'green.light',
													}}
													onClick={() => {
														dispatch(
															toggleDamageDetailModal(
																{
																	options: {
																		damageId:
																			damage.id,
																	},
																}
															)
														);
													}}
												/>
											</Box>
										</Tooltip>
									</Box>
								</SimpleGrid>
							)
						)}
					</Box>
				</>
			)}
		</>
	);
};
