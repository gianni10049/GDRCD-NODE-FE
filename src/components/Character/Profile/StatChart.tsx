import { Radar } from 'react-chartjs-2';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Chart as ChartJS,
	Filler,
	Legend,
	LineElement,
	PointElement,
	RadialLinearScale,
	Tooltip,
} from 'chart.js';
import {
	characterPointsTableData,
	statTableData,
} from '../../../apollo/Tables.model';
import { Box, Text, useToast } from '@chakra-ui/react';
import { getMe } from '../../../apollo/Generic';
import { characterTableData } from '../../../apollo/Characters.model';
import Permission from '../../Utils/Permission';
import { PopoverInfo } from '../../Utils/Popover';
import { updateStat } from '../../../apollo/Stats';

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

export const StatChart = (props: {
	stats: statTableData[];
	characterData: characterTableData;
	characterPoints: characterPointsTableData;
	refetchAll: any;
}) => {
	let { stats, characterData, characterPoints, refetchAll } = props;
	const [statData, setStatData] = useState<any>(null);
	const [charPermission, setCharPermission] = useState<boolean>(null);
	const { t } = useTranslation();
	const toast = useToast();

	const calcStatDataNew = useCallback(
		async (stats: statTableData[]) => {
			let data: any = {
				labels: [],
				datasets: [],
			};

			let datum: any = {
				data: [],
				backgroundColor: 'rgba(16,164,120,0.73)',
				borderColor: 'rgba(80,80,80,0.3)',
				borderWidth: 1,
				pointBackgroundColor: 'rgba(17,203,148,1)',
				pointRadius: 5,
				valueCont: {},
			};

			stats.forEach((stat) => {
				//@ts-ignore
				let name: string = t(`general.stats.${stat.name}`);
				let value = stat.characterStatData[0]?.value ?? 0;
				let bonus = 3;
				let total = value + bonus;

				datum.valueCont[name] = {
					'total': total,
					'value': value,
					'bonus': bonus,
				};
				datum.data.push(total);
				data.labels.push(name);
			});

			data.datasets.push(datum);

			setStatData(data);
		},
		[t]
	);

	const refetchData = useCallback(async () => {
		if (stats) {
			calcStatDataNew(stats).then(() => {});
		}

		getMe().then(async (resp) => {
			if (resp?.getMe?.me?.character?.id === characterData.id) {
				setCharPermission(true);
			} else {
				Permission.permissionControl({
					permission: 'MANAGE_STAT_OTHER',
				}).then((response) => {
					setCharPermission(response);
				});
			}
		});
	}, [calcStatDataNew, characterData.id, stats]);

	useEffect(() => {
		refetchData();
	}, [stats, characterPoints]); // eslint-disable-line react-hooks/exhaustive-deps

	const updateStatSubmit = async (stat: number) => {
		updateStat({ character: characterData.id, stat }).then((resp) => {
			if (resp.updateStat.response) {
				refetchAll();
			}

			toast({
				title: resp.updateStat.responseStatus,
				status: resp.updateStat.response ? 'success' : 'error',
				duration: 9000,
				isClosable: true,
			});
		});
	};

	return (
		<Box pos={'relative'}>
			{statData && charPermission && characterPoints?.stat_points > 0 && (
				<>
					<Box pos={'absolute'} right={0}>
						<PopoverInfo
							title={t(
								'charactersProfile.tabStats.popoverStatTitle'
							)}
							content={t(
								'charactersProfile.tabStats.popoverStatDescUser'
							)}
						/>
					</Box>
					<Box textAlign={'center'} color={'green.light'}>
						{t('charactersProfile.tabStats.statsPoints')}:{' '}
						{characterPoints?.stat_points}
					</Box>
					<Box
						pos={'absolute'}
						top={5}
						fontSize={13}
						color={'green.textLight'}>
						{stats?.map((stat, i: number) => (
							<Text
								cursor={'pointer'}
								_hover={{
									color: 'green.light',
								}}
								key={i}
								onClick={() => updateStatSubmit(stat.id)}>
								{
									//@ts-ignore
									t(`general.stats.${stat.name}`)
								}
							</Text>
						))}
					</Box>
				</>
			)}

			{(!charPermission || characterPoints?.stat_points === 0) && (
				<Box pos={'absolute'} right={0}>
					<PopoverInfo
						title={t('charactersProfile.tabStats.popoverStatTitle')}
						content={t(
							'charactersProfile.tabStats.popoverStatDesc'
						)}
					/>
				</Box>
			)}

			{statData && (
				<Radar
					data={statData}
					options={{
						plugins: {
							legend: {
								display: false,
							},
							tooltip: {
								callbacks: {
									label: function (tooltipItems: any) {
										let data =
											tooltipItems.dataset.valueCont[
												tooltipItems.label
											];
										return `${t(
											'charactersProfile.tabStats.statBase'
										)}: ${data.value}, ${t(
											'charactersProfile.tabStats.statBonus'
										)}: ${data.bonus}, ${t(
											'charactersProfile.tabStats.statTotal'
										)}: ${data.total}`;
									},
								},
							},
						},
						scales: {
							radar: {
								grid: {
									color: 'rgba(17,203,148,0.8)',
								},
								ticks: {
									stepSize: 3,
								},
								angleLines: {
									color: 'rgba(17,203,148,0.8)',
								},
								max: 15,
								pointLabels: {
									color: 'rgba(17,203,148,0.8)',
								},
							},
						},
					}}
				/>
			)}
		</Box>
	);
};
