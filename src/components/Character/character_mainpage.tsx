import { characterMainPageData, tabData } from './character_mainpage.model';
import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Box,
	Text,
	useDisclosure,
	Collapse,
	SimpleGrid,
	Flex,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

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

const DataInfo = (props: characterMainPageData) => {
	let { characterData } = props;
	const { isOpen: open1, onToggle: toggle1 } = useDisclosure();

	const { t } = useTranslation();

	return (
		<Box w={'full'} h={'full'}>
			<Box mb={4} w={'98%'}>
				<Box
					textTransform={'uppercase'}
					textAlign={'center'}
					fontSize={20}
					mx={'auto'}
					color={open1 ? 'white' : 'green.light'}
					bg={open1 ? 'green.lightOpacity' : 'green.text'}
					borderColor={'green.light'}
					borderStyle={'solid'}
					borderWidth={open1 ? 1 : '1px 0'}
					onClick={toggle1}
					fontFamily={'TecFont'}>
					{t('charactersProfile.tabData.firstBoxTitle')}
				</Box>
				<Collapse in={open1} animateOpacity>
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
						<Box py={2} overflow={'hidden'}>
							<Text>{t('charactersProfile.tabData.age')}:</Text>
							<Text>{characterData.age}</Text>
						</Box>
						<Box py={2} overflow={'hidden'}>
							<Text>{t('charactersProfile.tabData.name')}:</Text>
							<Text>{characterData.name}</Text>
						</Box>
						<Box py={2} overflow={'hidden'}>
							<Text>
								{t('charactersProfile.tabData.surname')}:
							</Text>
							<Text>{characterData.surname}</Text>
						</Box>
					</SimpleGrid>
				</Collapse>
			</Box>
		</Box>
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
