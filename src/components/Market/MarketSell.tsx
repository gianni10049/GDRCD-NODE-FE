import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getMarketSellList, marketSellItem } from '../../apollo/Market';
import { marketSellData } from '../../apollo/Market.model';
import { Box, Image, Button, useToast } from '@chakra-ui/react';
import { PopoverInfo } from '../Utils/Popover';

export const MarketSell = () => {
	const { t } = useTranslation();
	let [marketSellList, setMarketSellList] = useState<marketSellData[]>(null);
	const toast = useToast();

	useEffect(() => {
		getMarketSellList({}).then((data) => {
			setMarketSellList(data.getMarketSellList);
		});
	}, []);

	const buySellItem = (id: number) => {
		marketSellItem({ id: id }).then((data) => {
			toast({
				title: data.marketSellItem.responseStatus,
				status: data.marketSellItem.response ? 'success' : 'error',
				duration: 9000,
				isClosable: true,
			});

			if (data.marketSellItem.response) {
				setMarketSellList(data.marketSellItem.list);
			}
		});
	};

	// @ts-ignore
	return (
		<Box h={'full'} w={'full'}>
			<Box d={'flex'} flexWrap={'wrap'} pb={10}>
				{marketSellList?.map((item) => {
					return (
						<>
							<Box
								borderColor={'green.light'}
								borderStyle={'solid'}
								borderWidth={'1px'}
								color={'green.textLight'}
								p={2}
								borderRadius={5}
								pos={'relative'}
								maxW={'200px'}
								m={2}>
								<Box pos={'absolute'} top={0} right={0}>
									<PopoverInfo
										title={
											item?.objectListData?.objectData
												?.name
										}
										content={
											item?.objectListData?.objectData
												?.description
										}
									/>
								</Box>
								<Box
									textAlign={'center'}
									d={'flex'}
									fontSize={12}>
									{item?.objectListData?.objectData?.name}{' '}
								</Box>
								<Box
									d={'flex'}
									justifyContent={'center'}
									mt={2}>
									<Image
										w={'50px'}
										h={'50px'}
										objectFit={'cover'}
										objectPosition={'center'}
										src={
											item?.objectListData?.objectData
												?.img
										}
									/>
								</Box>
								<Box textAlign={'center'} mt={2} fontSize={12}>
									{item?.price} {t('mainMenu.user.resources')}{' '}
								</Box>
								<Button
									mt={2}
									mx={'auto'}
									textAlign={'center'}
									type='button'
									rounded={'none'}
									p={2}
									border={'1px solid'}
									borderColor={'green.light'}
									color={'green.light'}
									d={'flex'}
									_hover={{
										bg: 'green.lightOpacity',
										color: 'green.light',
									}}
									bg={'transparent'}
									onClick={() => {
										buySellItem(item?.id);
									}}>
									{t('market.buttons.buy')}
								</Button>
							</Box>
						</>
					);
				})}
			</Box>
		</Box>
	);
};
