import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getMarketBuyList, marketBuyItem } from '../../apollo/Market';
import { marketData } from '../../apollo/Market.model';
import { Box, Image, Button, useToast } from '@chakra-ui/react';
import { PopoverInfo } from '../Utils/Popover';

export const MarketBuy = () => {
	const { t } = useTranslation();
	let [marketBuyList, setMarketBuyList] = useState<marketData[]>(null);
	const toast = useToast();

	useEffect(() => {
		getMarketBuyList({}).then((data) => {
			setMarketBuyList(data.getMarketBuyList);
		});
	}, []);

	const calcRemainedPercentage = (total: number, remained: number) => {
		let remained_percentage = (100 * remained) / total;

		switch (true) {
			case remained_percentage >= 75:
				return 'market.perc75';
			case remained_percentage >= 50 && remained_percentage < 75:
				return 'market.perc50';
			case remained_percentage >= 25 && remained_percentage < 50:
				return 'market.perc25';
			case remained_percentage >= 0 && remained_percentage < 25:
				return 'market.perc0';
		}
	};

	const buyItem = (id: number) => {
		marketBuyItem({ id: id }).then((data) => {
			toast({
				title: data.marketBuyItem.responseStatus,
				status: data.marketBuyItem.response ? 'success' : 'error',
				duration: 9000,
				isClosable: true,
			});

			if (data.marketBuyItem.list) {
				setMarketBuyList(data.marketBuyItem.list);
			}
		});
	};

	// @ts-ignore
	return (
		<Box h={'full'} w={'full'}>
			<Box d={'flex'} flexWrap={'wrap'} pb={10}>
				{marketBuyList?.map((item) => {
					const percentageColor = calcRemainedPercentage(
						item.total,
						item.remained
					);

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
										title={item?.objectData?.name}
										content={item?.objectData?.description}
									/>
								</Box>
								<Box
									textAlign={'center'}
									d={'flex'}
									fontSize={12}>
									{item?.objectData?.name}{' '}
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
										src={item?.objectData?.img}
									/>
								</Box>
								<Box textAlign={'center'} mt={2} fontSize={12}>
									{item?.objectData?.price}{' '}
									{t('mainMenu.user.resources')}{' '}
								</Box>
								<Box textAlign={'center'} mt={2}>
									{item?.remained} / {item?.total}
								</Box>
								{item?.remained > 0 && (
									<Button
										mt={2}
										mx={'auto'}
										textAlign={'center'}
										type='button'
										rounded={'none'}
										p={2}
										border={'1px solid'}
										borderColor={percentageColor}
										color={percentageColor}
										d={'flex'}
										_hover={{
											bg: 'green.lightOpacity',
											color: percentageColor,
										}}
										bg={'transparent'}
										onClick={() => {
											buyItem(item?.id);
										}}>
										{t('market.buy')}
									</Button>
								)}
							</Box>
						</>
					);
				})}
			</Box>
		</Box>
	);
};
