import { characterMainPageData, tabData } from './character_mainpage.model';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';

const SingleTab = (props: tabData) => {
	let { title } = props;

	return (
		<Tab
			color={'white'}
			borderColor={'green.light'}
			borderWidth={'0 1px 1px 0'}
			borderStyle={'solid'}
			fontFamily={'TecFont'}
			fontWeight={'hairline'}
			_last={{
				borderWidth: '0 0 1px 0',
			}}
			fontSize={16}
			rounded={'none'}
			_selected={{
				color: 'green.light',
				borderStyle: 'solid',
				borderWidth: '0 1px 0 0 !important',
				borderColor: 'green.light',
				bgGradient: 'linear(to-t, transparent, green.text)',
			}}>
			{title}
		</Tab>
	);
};

const CharacterMainPage = (props: characterMainPageData) => {
	return (
		<Tabs isFitted isLazy={true} variant='enclosed'>
			<TabList border={'none'}>
				<SingleTab title={'One'} />
				<SingleTab title={'Two'} />
				<SingleTab title={'Three'} />
			</TabList>
			<TabPanels>
				<TabPanel>
					<p>one!</p>
				</TabPanel>
				<TabPanel>
					<p>two!</p>
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
