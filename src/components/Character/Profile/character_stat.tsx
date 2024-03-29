import React, { useCallback, useEffect, useState } from 'react';
import { characterStatData } from './character_stat.model';
import { Box, Collapse, useDisclosure, Icon, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
	getCharacterAbi,
	getCharacterStats,
	getCharacterPoints,
	getCharacterPercentages,
} from '../../../apollo/Characters';
import { StatChart } from './StatChart';
import { AbiChart } from './AbiChart';
import {
	abilityTableData,
	characterPercentagesData,
	characterPointsTableData,
	statTableData,
} from '../../../apollo/Tables.model';
import { CharPoints } from './Points';
import { AiOutlineReload } from 'react-icons/ai';

export const CharStatTab = (props: characterStatData) => {
	const { characterData } = props;
	const { t } = useTranslation();
	const { isOpen: open1, onToggle: toggle1 } = useDisclosure();
	const { isOpen: open2, onToggle: toggle2 } = useDisclosure();
	const { isOpen: open3, onToggle: toggle3 } = useDisclosure();
	const [statResponse, setStatResponse] = useState<statTableData[]>(null);
	const [abiResponse, setAbiResponse] = useState<abilityTableData[]>(null);
	const [pointsResponse, setPointsResponse] =
		useState<characterPointsTableData>(null);
	const [percentages, setPercentages] =
		useState<characterPercentagesData>(null);

	const refetchData = useCallback(async () => {
		getCharacterStats({
			characterId: characterData.id,
		}).then((resp) => {
			setStatResponse(resp.getCharacterStats.table);
		});

		getCharacterAbi({
			characterId: characterData.id,
		}).then((resp) => {
			setAbiResponse(resp.getCharacterAbility.table);
		});

		getCharacterPoints({
			characterId: characterData.id,
		}).then((resp) => {
			setPointsResponse(resp.getCharacterPoints.table);
		});

		getCharacterPercentages({
			characterId: characterData.id,
		}).then((response) => {
			setPercentages(response.getCharacterActionPercentages.percentages);
		});
	}, [characterData]);

	useEffect(() => {
		refetchData().then(() => {});
	}, [refetchData]);

	return (
		<Box>
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
					mt={-115}
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

			<Box
				mt={5}
				textTransform={'uppercase'}
				textAlign={'center'}
				fontSize={20}
				mx={'auto'}
				color={'green.light'}
				cursor={'pointer'}
				bg={'green.text'}
				borderColor={'green.light'}
				borderStyle={'solid'}
				borderWidth={1}
				onClick={toggle3}
				fontFamily={'TecFont'}>
				{t('charactersProfile.tabStats.pointsTitle')}
			</Box>
			<Collapse in={open3}>
				<Box
					overflow={'hidden'}
					w={'full'}
					borderColor={'green.light'}
					borderStyle={'solid'}
					borderWidth={'0 1px 1px 1px'}
					bg={'green.lightOpacity'}
					color={'green.textLight'}
					m={'0 auto'}>
					<CharPoints
						points={pointsResponse}
						characterId={characterData.id}
						percentages={percentages}
					/>
				</Box>
			</Collapse>
			<Box
				mt={5}
				textTransform={'uppercase'}
				textAlign={'center'}
				fontSize={20}
				mx={'auto'}
				color={'green.light'}
				bg={'green.text'}
				borderColor={'green.light'}
				borderStyle={'solid'}
				cursor={'pointer'}
				borderWidth={1}
				onClick={toggle1}
				fontFamily={'TecFont'}>
				{t('charactersProfile.tabStats.statsTitle')}
			</Box>
			<Collapse in={open1}>
				<Box
					overflow={'hidden'}
					w={'full'}
					borderColor={'green.light'}
					borderStyle={'solid'}
					borderWidth={'0 1px 1px 1px'}
					bg={'green.lightOpacity'}
					color={'green.backgroundDark'}
					m={'0 auto'}>
					{setStatResponse && (
						<Box w={'full'} maxWidth={'500px'} m={'0 auto'}>
							<StatChart
								stats={statResponse}
								characterData={characterData}
								characterPoints={pointsResponse}
								refetchAll={refetchData}
							/>
						</Box>
					)}
				</Box>
			</Collapse>
			<Box
				mt={5}
				textTransform={'uppercase'}
				textAlign={'center'}
				fontSize={20}
				mx={'auto'}
				color={'green.light'}
				bg={'green.text'}
				borderColor={'green.light'}
				borderStyle={'solid'}
				borderWidth={1}
				cursor={'pointer'}
				onClick={toggle2}
				fontFamily={'TecFont'}>
				{t('charactersProfile.tabStats.abiTitle')}
			</Box>
			<Collapse in={open2}>
				{abiResponse && (
					<AbiChart
						abilities={abiResponse}
						characterId={characterData.id}
					/>
				)}
			</Collapse>
		</Box>
	);
};
