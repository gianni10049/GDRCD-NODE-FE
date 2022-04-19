import { Box, Icon, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AbiButtonsData, AbiChartData } from './AbiChart.model';
import { getIcons } from '../../Utils/Icons';
import { abilityTableData } from '../../../apollo/Tables.model';

export const AbiChart = (props: AbiChartData) => {
	let { abilities } = props;

	return (
		<>
			{abilities.map((item: abilityTableData, i) => (
				<Box key={i}>
					<AbiButton
						tooltip={item.name}
						points={item.characterAbilityData[0]?.value}
						icon={item.icon}
						max_level={item.max_level}
					/>
				</Box>
			))}
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
					as={getIcons({ icon: icon })}
					boxSize={10}
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
