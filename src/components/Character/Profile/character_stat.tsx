import React, { useEffect, useState } from 'react';
import { characterStatData } from './character_stat.model';
import { Box, Collapse, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GQLQuery } from '../../../apollo/GQL';
import { GET_CHAR_ABILITY, GET_CHAR_STATS } from '../../../apollo/Characters';
import { StatChart } from './StatChart';
import { AbiChart } from './AbiChart';
import { abilityTableData, statTableData } from '../../../apollo/Tables.model';

export const StatChar = (props: characterStatData) => {
	const { characterData } = props;
	const { t } = useTranslation();
	const { isOpen: open1, onToggle: toggle1 } = useDisclosure();
	const { isOpen: open2, onToggle: toggle2 } = useDisclosure();
	const [statResponse, setStatResponse] = useState<statTableData[]>(null);
	const [abiResponse, setAbiResponse] = useState<abilityTableData[]>(null);

	useEffect(() => {
		getCharacterStats(characterData.id).then((resp) => {
			setStatResponse(resp.getCharacterStats.table);
		});

		getCharacterAbi(characterData.id).then((resp) => {
			setAbiResponse(resp.getCharacterAbility.table);
		});
	}, [characterData]);

	const getCharacterStats = async (id: number) => {
		return await GQLQuery(GET_CHAR_STATS, {
			characterId: id,
		});
	};

	const getCharacterAbi = async (id: number) => {
		return await GQLQuery(GET_CHAR_ABILITY, {
			characterId: id,
		});
	};

	return (
		<>
			<Box
				textTransform={'uppercase'}
				textAlign={'center'}
				fontSize={20}
				mx={'auto'}
				color={'green.light'}
				bg={'green.text'}
				borderColor={'green.light'}
				borderStyle={'solid'}
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
							<StatChart stats={statResponse} />
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
				onClick={toggle2}
				fontFamily={'TecFont'}>
				{t('charactersProfile.tabStats.abiTitle')}
			</Box>
			<Collapse in={open2}>
				{abiResponse && <AbiChart abilities={abiResponse} />}
			</Collapse>
		</>
	);
};
