import React, { useCallback, useEffect, useState } from 'react';
import {
	Box,
	Text,
	AspectRatio,
	Image,
	SimpleGrid,
	useDisclosure,
	Collapse,
	Icon,
} from '@chakra-ui/react';
import { groupData, groupRolesData } from '../../apollo/Groups.modal';
import { getGroup, getGroups } from '../../apollo/Groups';
import { getImage } from '../Utils/Icons';
import { useTranslation } from 'react-i18next';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

export const Groups = () => {
	let [groups, setGroups] = useState<groupData[]>([]);
	let [selectedGroup, setSelectedGroup] = useState<number>();
	let [selectedGroupData, setSelectedGroupData] = useState<groupData>();
	let last_type: number = 0;
	let stamp: boolean = false;
	let { t } = useTranslation();
	const { isOpen: open1, onToggle: toggle1 } = useDisclosure();

	const refetchData = useCallback(async () => {
		getGroups({}).then((resp) => {
			setGroups(resp.getGroups);
		});

		if (selectedGroup) {
			getGroup({ id: selectedGroup }).then((resp) => {
				setSelectedGroupData(resp.getGroup);
			});
		}
	}, [selectedGroup]);

	useEffect(() => {
		refetchData().then(() => {});
	}, [refetchData]);

	const selectGroup = async (id: number) => {
		setSelectedGroup(id);
	};

	return (
		<Box h={'full'} w={'full'} d={'flex'}>
			<Box
				w={'250px'}
				h={'full'}
				borderRight={'1px solid'}
				borderColor={'green.light'}
				overflow={'auto'}>
				{groups?.map((group: groupData, i: number) => {
					if (last_type !== group.type) {
						stamp = true;
						last_type = group.type;
					} else {
						stamp = false;
					}

					return (
						<Box key={i}>
							{stamp && (
								<Box
									d={'flex'}
									color={'green.light'}
									fontWeight={'bold'}
									textAlign={'center'}
									justifyContent={'center'}
									alignItems={'center'}
									fontSize={20}
									pb={2}
									borderColor={'green.light'}
									borderWidth={'0 0 1px 0'}>
									<AspectRatio
										w='40px'
										mr={2}
										ratio={1}
										borderRadius={'full'}
										overflow={'hidden'}
										borderColor={'green.light'}
										border={'1px solid'}>
										<Image
											w={'full'}
											h={'full'}
											objectFit={'cover'}
											objectPosition={'center'}
											src={getImage(
												group.groupTypeData.logo
											)}
											alt={group.name}
										/>
									</AspectRatio>
									<Box>{group.groupTypeData.name}</Box>
								</Box>
							)}

							<Box
								padding={'5px 0 5px 0'}
								d={'flex'}
								color={'green.textLight'}
								fontSize={13}
								justifyContent={'left'}
								alignItems={'center'}>
								<AspectRatio
									w='30px'
									mr={2}
									ratio={1}
									borderRadius={'full'}
									overflow={'hidden'}
									borderColor={'green.light'}
									border={'1px solid'}>
									<Image
										w={'full'}
										h={'full'}
										objectFit={'cover'}
										objectPosition={'center'}
										src={getImage(group.logo)}
										alt={group.name}
									/>
								</AspectRatio>
								<Text
									_hover={{
										color: 'green.light',
									}}
									cursor={'pointer'}
									fontSize={15}
									onClick={() => selectGroup(group.id)}>
									{group.name}
								</Text>
							</Box>
						</Box>
					);
				})}
			</Box>

			{selectedGroup && (
				<Box h='full' w='full' ml={2}>
					<Box
						d={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						color={'green.light'}
						fontWeight={'bold'}
						textAlign={'center'}
						fontSize={18}
						borderColor={'green.light'}
						borderWidth={'1px 1px 0 1px'}
						h={'40px'}>
						<AspectRatio
							w='30px'
							mr={2}
							ratio={1}
							borderRadius={'full'}
							overflow={'hidden'}
							borderColor={'green.light'}
							border={'1px solid'}>
							<Image
								w={'full'}
								h={'full'}
								objectFit={'cover'}
								objectPosition={'center'}
								src={getImage(selectedGroupData?.logo)}
								alt={selectedGroupData?.name}
							/>
						</AspectRatio>
						<Text fontSize={25}>{selectedGroupData?.name}</Text>
					</Box>

					<Box
						h={'calc(100% - 45px)'}
						p={'2px'}
						border={'1px solid'}
						bg={'green.background'}
						overflow={'auto'}
						borderColor={'green.light'}>
						<Box>
							<Box
								w={'75%'}
								color={'green.light'}
								fontWeight={'bold'}
								textAlign={'center'}
								fontSize={18}
								borderColor={'green.light'}
								borderWidth={'0 0 1px 0'}
								margin={'0 auto'}>
								{t('modals.groups.roles')}
							</Box>
							<SimpleGrid
								w={'75%'}
								m={'0 auto'}
								spacingY={2}
								fontFamily={'TecFont'}
								color={'green.light'}
								textAlign={'center'}
								columns={2}
								fontWeight={'bold'}
								fontSize={20}
								py={1}>
								<Box overflow={'hidden'}>
									<Text> {t('modals.groups.name')}</Text>
								</Box>
								<Box overflow={'hidden'}>
									<Text> {t('modals.groups.earn')}</Text>
								</Box>
							</SimpleGrid>
							{selectedGroupData?.rolesData?.map(
								(role: groupRolesData, i: number) => (
									<SimpleGrid
										key={i}
										w={'75%'}
										m={'0 auto'}
										spacingY={2}
										fontFamily={'TecFont'}
										color={'green.light'}
										textAlign={'center'}
										_last={{
											borderColor: 'green.light',
											borderWidth: '0 0 1px 0',
										}}
										columns={2}>
										<Box
											overflow={'hidden'}
											borderColor={'green.light'}
											borderWidth={'1px 1px 0 1px '}>
											<Text>{role.name}</Text>
										</Box>
										<Box
											overflow={'hidden'}
											borderColor={'green.light'}
											borderWidth={'1px 1px 0 0 '}>
											<Text>{role.earn} </Text>
										</Box>
									</SimpleGrid>
								)
							)}{' '}
						</Box>

						<Box mt={5}>
							<Box
								w={'75%'}
								color={'green.light'}
								fontWeight={'bold'}
								textAlign={'center'}
								fontSize={18}
								borderColor={'green.light'}
								borderWidth={'0 0 1px 0'}
								margin={'0 auto'}>
								{t('modals.groups.members')}
							</Box>

							<SimpleGrid
								w={'75%'}
								m={'0 auto'}
								spacingY={2}
								fontFamily={'TecFont'}
								color={'green.light'}
								textAlign={'center'}
								columns={3}
								fontWeight={'bold'}
								fontSize={20}
								py={1}>
								<Box overflow={'hidden'}>
									<Text> {t('modals.groups.name')}</Text>
								</Box>
								<Box overflow={'hidden'}>
									<Text> {t('modals.groups.role')}</Text>
								</Box>
								<Box overflow={'hidden'}>
									<Text> {t('modals.groups.manager')}</Text>
								</Box>
							</SimpleGrid>

							{selectedGroupData?.rolesData?.map(
								(role: groupRolesData, i: number) => (
									<Box
										key={i}
										w={'75%'}
										m={'0 auto'}
										_last={{
											borderColor: 'green.light',
											borderWidth: '0 0 1px 0',
										}}>
										{role?.groupMembers?.map((member) => (
											<SimpleGrid
												key={i}
												m={'0 auto'}
												spacingY={2}
												fontFamily={'TecFont'}
												color={'green.light'}
												textAlign={'center'}
												_last={{
													borderColor: 'green.light',
													borderWidth: '0 1px 0 0',
												}}
												columns={3}>
												<Box
													overflow={'hidden'}
													borderColor={'green.light'}
													borderWidth={
														'1px 0 0 1px '
													}>
													<Text>
														{
															member.memberData
																.fullname
														}
													</Text>
												</Box>
												<Box
													overflow={'hidden'}
													borderColor={'green.light'}
													borderWidth={
														'1px 0 0 1px '
													}>
													<Text>{role.name} </Text>
												</Box>
												<Box
													overflow={'hidden'}
													borderColor={'green.light'}
													borderWidth={
														'1px 0 0 1px '
													}>
													{member.manager ? (
														<Icon
															as={AiFillStar}
															boxSize={5}
														/>
													) : (
														<Icon
															as={AiOutlineStar}
															boxSize={5}
														/>
													)}
												</Box>
											</SimpleGrid>
										))}
									</Box>
								)
							)}
						</Box>

						<Box
							mt={3}
							w={'90%'}
							textTransform={'uppercase'}
							textAlign={'center'}
							fontSize={20}
							mx={'auto'}
							color={open1 ? 'green.textLight' : 'green.light'}
							bg={open1 ? 'green.lightOpacity' : 'green.text'}
							borderColor={'green.light'}
							borderStyle={'solid'}
							borderWidth={1}
							cursor={'pointer'}
							onClick={toggle1}
							fontFamily={'TecFont'}>
							{t('modals.groups.description')}
						</Box>
						<Collapse in={open1} animateOpacity>
							<Box
								borderColor={'green.light'}
								borderStyle={'solid'}
								borderWidth={'0 1px 1px 1px'}
								bg={'green.lightOpacity'}
								fontFamily={'TecFont'}
								textAlign={'left'}
								fontSize={14}
								color={'green.textLight'}
								w={'90%'}
								m={'0 auto'}
								p={3}>
								{selectedGroupData?.description}
							</Box>
						</Collapse>
					</Box>
				</Box>
			)}
		</Box>
	);
};
