import React, { useEffect, useState } from 'react';
import { characterHealthData } from './character_healt.model';
import { GQLQuery } from '../../../apollo/GQL';
import { GET_PARTS_DAMAGE, GET_PARTS_LIST } from '../../../apollo/Generic';
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
import { AiOutlineReload } from 'react-icons/ai';

export const CharHealthTab = (props: characterHealthData) => {
	const { characterData } = props;

	const [partsData, setPartsData] = useState<any>(false);
	const [partDamage, setPartDamage] = useState<any>(false);
	const { t } = useTranslation();
	const toast = useToast();
	const dispatch = useDispatch();

	useEffect(() => {
		getPartsList(characterData.id).then((resp) => {
			let parts = resp.getPartsList.table.map((part: any) => {
				let new_obj = { ...part };
				let perc = calcPercentage(part);
				let color = calcColor(perc);

				new_obj.percentage = perc;
				new_obj.color = color;

				return new_obj;
			});

			setPartsData(parts);
		});
	}, [characterData]);

	const refetchData = async () => {
		getPartsList(characterData.id).then((resp) => {
			let parts = resp.getPartsList.table.map((part: any) => {
				let new_obj = { ...part };
				let perc = calcPercentage(part);
				let color = calcColor(perc);

				new_obj.percentage = perc;
				new_obj.color = color;

				return new_obj;
			});

			setPartsData(parts);
		});
	};

	const getPartsList = async (id: number) => {
		return await GQLQuery(GET_PARTS_LIST, {
			characterId: id,
		});
	};

	const getDamageListByPart = async (character: number, part: number) => {
		return await GQLQuery(GET_PARTS_DAMAGE, {
			characterId: character,
			partId: part,
		});
	};

	const loadPartDamage = async (part: number) => {
		getDamageListByPart(characterData.id, part).then((resp) => {
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

	const calcPercentage = (part: any) => {
		let total = 0;

		part.partDamages.forEach((damage: any) => {
			total += damage.points;
		});

		return Math.floor((100 / part.max_points) * (10 - total));
	};

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
							// @ts-ignore
							label={t('general.bodyParts.' + part.name)}
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
									h={part.percentage + `%`}
									bg={part.color}
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
										<Text
											onClick={() => {
												dispatch(
													toggleDamageDetailModal({
														options: {
															damageId: damage.id,
														},
													})
												);
											}}>
											blabla
										</Text>
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
