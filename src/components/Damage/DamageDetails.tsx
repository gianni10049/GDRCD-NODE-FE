import React, { useEffect, useState } from 'react';
import { DamageDetailsData } from './DamageDetails.model';
import { GQLmutation, GQLQuery } from '../../apollo/GQL';
import { GET_DAMAGE, SET_DAMAGE_SOLVED } from '../../apollo/Damage';
import { characterDamageTableData } from '../../apollo/Tables.model';
import { PopoverInfo } from '../Utils/Popover';
import { Box, Icon, Tooltip, useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { BsFolderCheck } from 'react-icons/bs';
import Permission from '../Utils/Permission';

export const DamageDetails = (props: DamageDetailsData) => {
	let { options } = props;

	const [damageId] = useState<number>(options.damageId);
	const [damageData, setDamageData] =
		useState<characterDamageTableData>(null);
	const [permission, setPermission] = useState<boolean>(false);
	const { t } = useTranslation();
	const toast = useToast();

	useEffect(() => {
		getDamage(damageId).then((resp) => {
			setDamageData(resp.getDamage.damage);
			controlPermission().then((resp) => {
				setPermission(resp);
			});
		});
	}, [damageId]);

	const getDamage = async (id: number) => {
		return await GQLQuery(GET_DAMAGE, {
			damageId: id,
		});
	};

	const setDamageSolved = async (id: number) => {
		return await GQLmutation(SET_DAMAGE_SOLVED, {
			damageId: id,
		});
	};

	const setSolved = async () => {
		setDamageSolved(damageId).then((resp) => {
			if (resp.setDamageSolved.response) {
				setDamageData(resp.setDamageSolved.damage);
			}

			toast({
				title: resp.setDamageSolved.responseStatus,
				status: resp.setDamageSolved.response ? 'success' : 'error',
				duration: 9000,
				isClosable: true,
			});
		});
	};

	const controlPermission = async () => {
		return await Permission.permissionControl({
			permission: 'MANAGE_DAMAGES',
		});
	};

	return (
		<Box w={'full'} h={'full'} pos={'relative'} overflowX={'hidden'}>
			<Box pos={'absolute'} top={1} right={1}>
				<PopoverInfo
					title={t('ability.abilityDetailsTitle')}
					content={t('ability.abilityDetailsText')}
				/>
			</Box>
			{damageData && (
				<>
					{!damageData.solved && permission && (
						<Tooltip
							hasArrow
							// @ts-ignore
							label={t('modals.damage_details.solved')}
							bg={'green.light'}
							color={'green.text'}
							fontSize={'md'}
							placement={'bottom'}
							fontFamily={'TecFont'}
							letterSpacing={'widest'}
							fontWeight={'extrabold'}>
							<Box pos={'absolute'} top={1} left={1}>
								<Icon
									as={BsFolderCheck}
									boxSize={8}
									color={'green.textLight'}
									cursor={'pointer'}
									_hover={{
										color: 'green.light',
									}}
									onClick={setSolved}
								/>
							</Box>
						</Tooltip>
					)}

					<Box
						textAlign={'center'}
						fontSize={25}
						color={'green.textLight'}>
						{damageData.title} ({damageData.points} pt.)
					</Box>
					<Box
						w={'90%'}
						m={'0 auto'}
						border={'1px solid'}
						borderColor={'green.light'}
						my={2}
						fontSize={20}
						fontFamily={'RegularText'}
						color={'green.textLight'}
						py={2}
						px={5}>
						{damageData.description}
					</Box>
				</>
			)}
		</Box>
	);
};
