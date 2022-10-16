import React from 'react';
import { TabList, TabPanel, TabPanels, Tabs, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SingleTab } from '../Utils/Tabs';
import { MarketBuy } from './MarketBuy';
import { MarketSell } from './MarketSell';

export const Market = () => {
	const { t } = useTranslation();

	return (
		<Box w={'full'} h={'full'} overflow={'hidden'}>
			<Box bg={'green.backgroundDark'} w={'full'} h={'full'}>
				<Tabs
					isFitted
					isLazy
					variant='enclosed'
					defaultIndex={0}
					h={'full'}>
					<TabList
						border={'none'}
						d={'flex'}
						alignItems={'bottom'}
						mt={2}>
						<SingleTab title={t('market.tabs.buy')} />
						<SingleTab title={t('market.tabs.sell')} />
						<SingleTab title={t('market.tabs.exchange')} />
					</TabList>
					<TabPanels h={'full'}>
						<TabPanel h={'full'} overflow={'auto'}>
							<MarketBuy />
						</TabPanel>
						<TabPanel>
							<MarketSell />
						</TabPanel>
						<TabPanel></TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Box>
	);
};
