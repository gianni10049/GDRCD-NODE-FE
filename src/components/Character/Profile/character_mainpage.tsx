import { characterMainPageData, tabData } from './character_mainpage.model';
import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Flex,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StatChar } from './character_stat';
import { DataInfo } from './character_data';

const SingleTab = (props: tabData) => {
	let { title } = props;

	return (
		<Tab
			color={'white'}
			fontFamily={'TecFont'}
			fontSize={12}
			fontWeight={'hairline'}
			borderStyle={'solid'}
			borderWidth={'0 0 1px 0'}
			_last={{
				borderRightWidth: '0 !important',
			}}
			_first={{
				borderLeftWidth: '0 !important',
			}}
			borderColor={'green.light'}
			_selected={{
				borderWidth: '1px',
				borderBottomWidth: '0px',
				padding: '0 15px',
				fontSize: 16,
				color: 'green.light',
				bgGradient: 'linear(to-t, transparent, green.text)',
			}}>
			<Flex>
				{title}
				{/*
				- TODO Cercare di risolvere questo warning del doppio button innestato
				<PopoverInfo title={'Test modale'} content={'TEST TEST TEST'} />
				*/}
			</Flex>
		</Tab>
	);
};

const CharacterMainPage = (props: characterMainPageData) => {
	let { characterData } = props;
	const { t } = useTranslation();

	return (
		<Tabs isFitted isLazy variant='enclosed' defaultIndex={0}>
			<TabList border={'none'} d={'flex'} alignItems={'bottom'} mt={2}>
				<SingleTab title={t('charactersProfile.tabData.tabButton')} />
				<SingleTab title={t('charactersProfile.tabStats.tabButton')} />
				<SingleTab title={t('charactersProfile.tabHealth.tabButton')} />
			</TabList>
			<TabPanels>
				<TabPanel>
					<DataInfo characterData={characterData} />
				</TabPanel>
				<TabPanel>
					<StatChar characterData={characterData} />
				</TabPanel>
				<TabPanel>
					<p>tree!</p>
				</TabPanel>
				<TabPanel>
					<p>two!</p>
				</TabPanel>
				<TabPanel>
					<p>two!</p>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default CharacterMainPage;
