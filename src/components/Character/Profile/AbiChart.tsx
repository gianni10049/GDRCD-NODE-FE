import { Box, Icon, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AbiButtonsData, AbiChartData } from './AbiChart.model';
import { getIcon } from '../../Utils/Icons';
import { abilityTableData } from '../../../apollo/Tables.model';
import { useTranslation } from 'react-i18next';

export const AbiChart = (props: AbiChartData) => {
	let { abilities } = props;
	const { t } = useTranslation();

	let last_analyzed = '';

	const analyzed = (stat: string) => {
		if (last_analyzed !== stat) {
			last_analyzed = stat;
			return true;
		} else {
			return false;
		}
	};

	return (
		<>
			<Box
				overflow={'hidden'}
				w={'full'}
				borderColor={'green.light'}
				borderStyle={'solid'}
				borderWidth={'0 1px 1px 1px'}
				bg={'green.lightOpacity'}
				color={'green.backgroundDark'}
				justifyContent={'center'}
				d={'flex'}
				flexWrap={'wrap'}
				py={2}
				m={'0 auto'}>
				{abilities.map((item: abilityTableData, i) => (
					<Box key={i}>
						{analyzed(item.statData.name) && (
							<Box
								d={'block'}
								w={'full'}
								color={'green.light'}
								textAlign={'center'}>
								{/*@ts-ignore*/}
								{t(`general.stats.${item.statData.name}`)}
							</Box>
						)}
						<AbiButton
							//@ts-ignore
							tooltip={t(`general.ability.${item.name}`)}
							points={item.characterAbilityData[0]?.value}
							icon={item.icon}
							max_level={item.max_level}
						/>
					</Box>
				))}
			</Box>
		</>
	);
};

export const AbiButton = (props: AbiButtonsData) => {
	let { tooltip, max_level, icon } = props;

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
				textAlign={'center'}>
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
