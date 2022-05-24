import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import {
	characterPercentagesData,
	characterPointsTableData,
} from '../../../apollo/Tables.model';
import { PopoverInfo } from '../../Utils/Popover';

export const CharPoints = (props: {
	points: characterPointsTableData;
	characterId: number;
	percentages: characterPercentagesData;
}) => {
	let { points, percentages } = props;
	const { t } = useTranslation();

	return (
		<>
			{points && percentages && (
				<SimpleGrid
					spacingY={5}
					minChildWidth={'120px'}
					borderColor={'green.light'}
					borderStyle={'solid'}
					borderWidth={'0 1px 1px 1px'}
					bg={'green.lightOpacity'}
					fontFamily={'TecFont'}
					textAlign={'center'}
					p={3}>
					<>
						<Box py={2} overflow={'hidden'}>
							<Text>{t('charactersProfile.tabStats.life')}:</Text>
							<Text>
								{points.life + percentages.life_calc.total}/
								{100 + percentages.life_calc.total}
							</Text>
						</Box>
						<Box py={2} overflow={'hidden'}>
							<Text>
								{t('charactersProfile.tabStats.stamina')}:
							</Text>
							<Text>
								{points.stamina +
									percentages.stamina_calc.total}
								/{100 + percentages.stamina_calc.total}
							</Text>
						</Box>
						<Box py={2} overflow={'hidden'}>
							<Text>
								{t('charactersProfile.tabStats.exp_total')}:
							</Text>
							<Text>
								{points.exp_usable}/{points.exp_total}
							</Text>
						</Box>
					</>
				</SimpleGrid>
			)}

			{percentages && (
				<>
					<Box
						textAlign={'center'}
						fontSize={22}
						fontWeight={'bold'}
						d={'flex'}
						justifyContent={'center'}>
						Bonus
						<PopoverInfo
							title={t(
								'charactersProfile.tabStats.pointsPopoverTitle'
							)}
							content={t(
								'charactersProfile.tabStats.pointsPopoverText'
							)}
						/>
					</Box>
					<SimpleGrid
						spacingY={5}
						minChildWidth={'120px'}
						borderColor={'green.light'}
						borderStyle={'solid'}
						borderWidth={'0 1px 1px 1px'}
						bg={'green.lightOpacity'}
						fontFamily={'TecFont'}
						textAlign={'center'}
						p={3}>
						<>
							<Box py={2} overflow={'hidden'}>
								<Text>
									{t(
										'charactersProfile.tabStats.life_calc_label'
									)}
									:
								</Text>
								<Text>{percentages.life_calc.total}%</Text>
							</Box>
							<Box py={2} overflow={'hidden'}>
								<Text>
									{t(
										'charactersProfile.tabStats.stamina_calc_label'
									)}
									:
								</Text>
								<Text>{percentages.stamina_calc.total}%</Text>
							</Box>
							<Box py={2} overflow={'hidden'}>
								<Text>
									{t(
										'charactersProfile.tabStats.find_calc_label'
									)}
									:
								</Text>
								<Text>{percentages.find_calc.total}%</Text>
							</Box>
							<Box py={2} overflow={'hidden'}>
								<Text>
									{t(
										'charactersProfile.tabStats.furtivity_calc_label'
									)}
									:
								</Text>
								<Text>{percentages.furtivity_calc.total}%</Text>
							</Box>
							<Box py={2} overflow={'hidden'}>
								<Text>
									{t(
										'charactersProfile.tabStats.investigate_calc_label'
									)}
									:
								</Text>
								<Text>
									{percentages.investigate_calc.total}%
								</Text>
							</Box>
							<Box py={2} overflow={'hidden'}>
								<Text>
									{t(
										'charactersProfile.tabStats.initiative_calc_label'
									)}
									:
								</Text>
								<Text>
									{percentages.initiative_calc.total}%
								</Text>
							</Box>
							<Box py={2} overflow={'hidden'}>
								<Text>
									{t(
										'charactersProfile.tabStats.price_calc_label'
									)}
									:
								</Text>
								<Text>{percentages.price_calc.total}%</Text>
							</Box>
							<Box py={2} overflow={'hidden'}>
								<Text>
									{t(
										'charactersProfile.tabStats.research_calc_label'
									)}
									:
								</Text>
								<Text>{percentages.research_calc.total}%</Text>
							</Box>
						</>
					</SimpleGrid>
				</>
			)}
		</>
	);
};
