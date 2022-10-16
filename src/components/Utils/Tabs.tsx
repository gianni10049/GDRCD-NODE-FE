import { tabData } from './Tabs.model';
import { Tab, Flex } from '@chakra-ui/react';
import React from 'react';
import { PopoverInfo } from './Popover';

export const SingleTab = (props: tabData) => {
	let { title, tabTitle, tabContent } = props;

	return (
		<Tab
			color={'white'}
			fontFamily={'TecFont'}
			fontWeight={'hairline'}
			borderStyle={'solid'}
			borderWidth={'1px'}
			ml={-2}
			bg={'green.backgroundDark'}
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
				<PopoverInfo title={tabTitle} content={tabContent} />
			</Flex>
		</Tab>
	);
};
