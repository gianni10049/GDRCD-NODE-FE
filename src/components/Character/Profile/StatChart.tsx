import { Radar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
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
import { statTableData } from '../../../apollo/Tables.model';

ChartJS.register(
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

export const StatChart = (props: { stats: statTableData[] }) => {
	let { stats } = props;
	const [statData, setStatData] = useState<any>(null);
	const { t } = useTranslation();

	const calcStatDataNew = async (stats: statTableData[]) => {
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
			let value = stat.characterStatData[0]?.value ?? 1;
			let bonus = 3;

			datum.valueCont[name] = {
				'total': value + bonus,
				'value': value,
				'bonus': bonus,
			};
			datum.data.push(value + bonus);
			data.labels.push(name);
		});

		data.datasets.push(datum);

		setStatData(data);
	};

	useEffect(() => {
		if (stats) {
			calcStatDataNew(stats).then(() => {});
		}
	}, [stats]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
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
		</>
	);
};
