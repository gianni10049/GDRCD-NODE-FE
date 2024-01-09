import { Box, Icon, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AbiButtonsData, AbiChartData } from './AbiChart.model';
import { getIcon } from '../../Utils/Icons';
import { abilityTableData, statTableData } from '../../../apollo/Tables.model';
import { useTranslation } from 'react-i18next';
import { listStats } from '../../../apollo/Stats';
import { useDispatch } from 'react-redux';
import { toggleAbilityDetailModal } from '../../../redux/abilityDetailsModal';
import { PopoverInfo } from '../../Utils/Popover';

export const AbiChart = (props: AbiChartData) => {
	let { abilities, characterId } = props;
	const { t } = useTranslation();
	const [stats, setStats] = useState<statTableData[]>([]);

	useEffect(() => {
		listStats().then((resp) => {
			setStats(resp.listStats);
		});
	});

	// @ts-ignore
	return (
		<Box
			borderColor={'green.light'}
			borderStyle={'solid'}
			w={'full'}
			overflow={'hidden'}
			bg={'green.lightOpacity'}
			color={'green.backgroundDark'}
			py={2}
			pos={'relative'}
			m={'0 auto'}
			borderWidth={'0 1px 1px 1px'}>
			<Box pos={'absolute'} top={1} right={1}>
				<PopoverInfo
					title={t('charactersProfile.tabStats.abiPopoverTitle')}
					content={t('charactersProfile.tabStats.abiPopoverText')}
				/>
			</Box>
			{stats.map((stat: statTableData, i) => (
				<Box key={i}>
					<Box
						d={'block'}
						w={'full'}
						color={'green.light'}
						textAlign={'center'}>
						{/*@ts-ignore*/}
						{t(`general.stats.${stat.name}`)}
					</Box>
					<Box justifyContent={'center'} d={'flex'} flexWrap={'wrap'}>
						{abilities.map((item: abilityTableData, i) => (
							<Box key={i}>
								{item.stat === stat.id && (
									<AbiButton
										characterId={characterId}
										abilityId={item.id}
										//@ts-ignore
										tooltip={t(
											//@ts-ignore
											`general.ability.${item.name}`
										)}
										points={
											item.characterAbilityData[0]?.value
										}
										icon={item.icon}
										max_level={item.max_level}
									/>
								)}
							</Box>
						))}
					</Box>
				</Box>
			))}
		</Box>
	);
};

export const AbiButton = (props: AbiButtonsData) => {
	let { abilityId, tooltip, max_level, icon, characterId } = props;
	const dispatch = useDispatch();

	let [percentage, setPercentage] = useState<number>(0),
		points = props.points ?? 0;

	useEffect(() => {
		setPercentage(Math.floor((100 / max_level) * points));
	}, [max_level, points]);

	let complex_tooltip = `${tooltip} ${points}/${max_level}`;

	return (
		<Tooltip
			hasArrow
			label={complex_tooltip}
			bg={points >= max_level ? 'yellow.bg' : 'green.light'}
			color={points >= max_level ? 'yellow.text' : 'green.text'}
			fontSize={'md'}
			placement={'bottom'}
			fontFamily={'TecFont'}
			letterSpacing={'widest'}
			fontWeight={'extrabold'}>
			<Box
				border={'1px solid'}
				borderColor={'green.textLight'}
				w={'50px'}
				h={'50px'}
				m={3}
				rounded={'full'}
				pos={'relative'}
				overflow={'hidden'}
				d={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				textAlign={'center'}
				onClick={() => {
					dispatch(
						//@ts-ignore
						toggleAbilityDetailModal({
							options: {
								abilityId: abilityId,
								characterId: characterId,
							},
						})
					);
				}}>
				<Icon
					color={points >= max_level ? 'yellow.text' : 'white'}
					pointerEvents={'none'}
					as={getIcon({ icon: icon })}
					boxSize={8}
					pos={'relative'}
					zIndex={2}
				/>
				<Box
					w={'full'}
					h={`${percentage}%`}
					bg={points >= max_level ? 'yellow.bg' : 'green.light'}
					pos={'absolute'}
					pointerEvents={'none'}
					bottom={0}
					zIndex={1}
				/>
			</Box>
		</Tooltip>
	);
};
