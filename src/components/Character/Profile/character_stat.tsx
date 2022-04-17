import { ResponsiveNetwork } from '@nivo/network';
import React, { useEffect, useState } from 'react';
import { characterStatData } from './character_stat.model';
import { Box, Collapse, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GQLQuery } from '../../../apollo/GQL';
import { GET_CHAR_STATS } from '../../../apollo/Characters';
import { characterStatTableData } from '../../../apollo/Characters.model';
import { StatChart } from './StatChart';

export const StatChar = (props: characterStatData) => {
	const { characterData } = props;
	const { t } = useTranslation();
	const { isOpen: open1, onToggle: toggle1 } = useDisclosure();
	const { isOpen: open2, onToggle: toggle2 } = useDisclosure();
	const [abiData]: any = useState(null);
	const [statResponse, setStatResponse] =
		useState<characterStatTableData[]>(null);

	useEffect(() => {
		getCharacterStats(characterData.id).then((resp) => {
			setStatResponse(resp.getCharacterStats.table);
		});
	}, [characterData]);

	const getCharacterStats = async (id: number) => {
		return await GQLQuery(GET_CHAR_STATS, {
			characterId: id,
		});
	};

	const abiChar = () => {
		return (
			<>
				{abiData && (
					<ResponsiveNetwork
						data={{
							'nodes': [
								{
									'id': 'Node 1',
									'height': 1,
									'size': 50,
									'color': 'rgb(97, 205, 187)',
								},
								{
									'id': 'Node 2',
									'height': 1,
									'size': 30,
									'color': 'rgb(97, 205, 187)',
								},
								{
									'id': 'Node 2.1',
									'height': 1,
									'size': 12,
									'color': 'rgb(97, 205, 187)',
								},
								{
									'id': 'Node 2.2',
									'height': 1,
									'size': 12,
									'color': 'rgb(97, 205, 187)',
								},
								{
									'id': 'Node 3',
									'height': 1,
									'size': 30,
									'color': 'rgb(97, 205, 187)',
								},
								{
									'id': 'Node 3.1',
									'height': 1,
									'size': 12,
									'color': 'rgb(97, 205, 187)',
								},
								{
									'id': 'Node 3.2',
									'height': 1,
									'size': 12,
									'color': 'rgb(97, 205, 187)',
								},
								{
									'id': 'Node 4',
									'height': 1,
									'size': 30,
									'color': 'rgb(97, 205, 187)',
								},
								{
									'id': 'Node 4.1',
									'height': 1,
									'size': 12,
									'color': 'rgb(97, 205, 187)',
								},
								{
									'id': 'Node 4.2',
									'height': 1,
									'size': 12,
									'color': 'rgb(97, 205, 187)',
								},
								{
									'id': 'Node 5',
									'height': 1,
									'size': 30,
									'color': 'rgb(97, 205, 187)',
								},
								{
									'id': 'Node 5.1',
									'height': 1,
									'size': 12,
									'color': 'rgb(97, 205, 187)',
								},
								{
									'id': 'Node 5.2',
									'height': 1,
									'size': 12,
									'color': 'rgb(97, 205, 187)',
								},
							],
							'links': [
								{
									'source': 'Node 1',
									'target': 'Node 2',
									'distance': 30,
								},
								{
									'source': 'Node 2',
									'target': 'Node 2.1',
									'distance': 30,
								},
								{
									'source': 'Node 2',
									'target': 'Node 2.2',
									'distance': 30,
								},
								{
									'source': 'Node 1',
									'target': 'Node 3',
									'distance': 30,
								},
								{
									'source': 'Node 3',
									'target': 'Node 3.1',
									'distance': 30,
								},
								{
									'source': 'Node 3',
									'target': 'Node 3.2',
									'distance': 30,
								},
								{
									'source': 'Node 1',
									'target': 'Node 4',
									'distance': 30,
								},
								{
									'source': 'Node 4',
									'target': 'Node 4.1',
									'distance': 30,
								},
								{
									'source': 'Node 4',
									'target': 'Node 4.2',
									'distance': 30,
								},
								{
									'source': 'Node 1',
									'target': 'Node 5',
									'distance': 30,
								},
								{
									'source': 'Node 5',
									'target': 'Node 5.1',
									'distance': 30,
								},
								{
									'source': 'Node 5',
									'target': 'Node 5.2',
									'distance': 30,
								},
							],
						}}
						margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
						linkDistance={50}
						centeringStrength={0.5}
						repulsivity={100}
						nodeSize={function (n) {
							return n.size;
						}}
						activeNodeSize={function (n) {
							return 1.5 * n.size;
						}}
						nodeColor={function (e) {
							return e.color;
						}}
						nodeBorderWidth={3}
						nodeBorderColor={{
							from: 'color',
							modifiers: [['darker', 0.8]],
						}}
						linkBlendMode='multiply'
						motionConfig='wobbly'
					/>
				)}
			</>
		);
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
				<Box
					overflow={'hidden'}
					h={'370px'}
					w={'full'}
					borderColor={'green.light'}
					borderStyle={'solid'}
					borderWidth={'0 1px 1px 1px'}
					bg={'green.lightOpacity'}
					color={'green.backgroundDark'}
					m={'0 auto'}>
					{abiChar()}
				</Box>
			</Collapse>
		</>
	);
};
