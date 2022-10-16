import { characterMainPageData } from './character_mainpage.model';
import { TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CharStatTab } from './character_stat';
import { CharDataInfo } from './character_data';
import { CharHealthTab } from './character_healt';
import { SingleTab } from '../../Utils/Tabs';

const CharacterMainPage = (props: characterMainPageData) => {
	let { characterData } = props;
	const { t } = useTranslation();

	return (
		<Tabs isFitted isLazy variant='enclosed' defaultIndex={0}>
			<TabList border={'none'} d={'flex'} alignItems={'bottom'} mt={2}>
				<SingleTab
					title={t('charactersProfile.tabData.tabButton')}
					tabTitle={t('charactersProfile.tabData.tabTitle')}
					tabContent={t('charactersProfile.tabData.tabContent')}
				/>
				<SingleTab
					title={t('charactersProfile.tabStats.tabButton')}
					tabTitle={t('charactersProfile.tabData.tabTitle')}
					tabContent={t('charactersProfile.tabData.tabContent')}
				/>
				<SingleTab
					title={t('charactersProfile.tabHealth.tabButton')}
					tabTitle={t('charactersProfile.tabData.tabTitle')}
					tabContent={t('charactersProfile.tabData.tabContent')}
				/>
			</TabList>
			<TabPanels>
				<TabPanel>
					<CharDataInfo characterData={characterData} />
				</TabPanel>
				<TabPanel>
					<CharStatTab characterData={characterData} />
				</TabPanel>
				<TabPanel>
					<CharHealthTab characterData={characterData} />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default CharacterMainPage;
