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
import { PopoverInfo } from '../Utils/Popover';

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
				<PopoverInfo title={'Test modale'} content={'TEST TEST TEST'} />
			</Flex>
		</Tab>
	);
};

const DataInfo = (props: characterMainPageData) => {
	let { characterData } = props;
	const { isOpen: open1, onToggle: toggle1 } = useDisclosure();

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
					Main data
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
							<Text>Age:</Text>
							<Text>{characterData.age}</Text>
						</Box>
						<Box py={2} overflow={'hidden'}>
							<Text>Name:</Text>
							<Text>{characterData.name}</Text>
						</Box>
						<Box py={2} overflow={'hidden'}>
							<Text>Surname:</Text>
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

	return (
		<Tabs isFitted isLazy variant='enclosed' defaultIndex={0}>
			<TabList border={'none'} d={'flex'} alignItems={'bottom'} mt={2}>
				<SingleTab title={'Data'} />
				<SingleTab title={'Stats'} />
				<SingleTab title={'Healt'} />
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
