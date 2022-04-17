import { characterMainPageData } from './character_mainpage.model';
import {
	Box,
	Text,
	useDisclosure,
	Collapse,
	SimpleGrid,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DataInfo = (props: characterMainPageData) => {
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
