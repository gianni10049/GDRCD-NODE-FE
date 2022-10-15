import React, { useCallback, useEffect, useState } from 'react';
import { getCharacterPoints, getCharactersList } from '../../apollo/Characters';
import { characterPointsTableData } from '../../apollo/Tables.model';
import { getMe, sendMoney } from '../../apollo/Generic';
import { PopoverInfo } from '../Utils/Popover';
import { Box, useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { CreateSingleInput, CreateSubmitInput } from '../Utils/Formik';
import { characterTableData } from '../../apollo/Characters.model';
import { sendMoneyInput } from '../../apollo/Generic.model';

export const Bank = () => {
	const [pointsResponse, setPointsResponse] =
		useState<characterPointsTableData>(null);
	const [charactersList, setCharactersList] = useState<[characterTableData]>([
		{},
	]);
	const toast = useToast();
	const { t } = useTranslation();

	let bonificoInitialValues = {
		money: 0,
		character: 0,
	};

	const bonificoSchemaValidation = Yup.object({
		money: Yup.number().positive().required('required'),
		character: Yup.number().required('required'),
	});

	const bonificoSubmit = async (data: sendMoneyInput, actions: any) => {
		sendMoney(data).then((resp) => {
			if (resp.sendMoney) {
				let status = resp.sendMoney.responseStatus;
				let response = resp.sendMoney.response;

				toast({
					title: status,
					status: response ? 'success' : 'error',
					duration: 9000,
					isClosable: true,
				});

				refetchData();
				actions.resetForm();
			}
		});
	};

	const refetchData = useCallback(async () => {
		getMe().then((resp) => {
			if (resp.getMe.response) {
				getCharacterPoints({
					characterId: resp?.getMe?.me?.character?.id,
				}).then((resp) => {
					setPointsResponse(resp?.getCharacterPoints?.table);
				});

				getCharactersList().then((resp) => {
					setCharactersList(resp.getCharactersList);
				});
			}
		});
	}, []);

	useEffect(() => {
		refetchData().then(() => {});
	}, [refetchData]);

	return (
		<Box w={'full'} h={'full'} pos={'relative'} overflow={'hidden'} p={2}>
			{pointsResponse && charactersList && (
				<>
					{/*SALDO */}
					<Box
						mt={3}
						textAlign={'center'}
						fontSize={25}
						pos={'relative'}
						color={'green.textLight'}>
						{t('modals.bank.currentMoneyTitle')}
						<Box pos={'absolute'} top={1} right={1}>
							<PopoverInfo
								title={t('ability.abilityDetailsTitle')}
								content={t('ability.abilityDetailsText')}
							/>
						</Box>
					</Box>

					<Box
						mt={3}
						textAlign={'left'}
						fontSize={20}
						pos={'relative'}
						color={'green.textLight'}>
						Risorse : {pointsResponse.resources}
					</Box>

					{/*BONIFICO */}
					<Box
						mt={3}
						textAlign={'center'}
						fontSize={25}
						pos={'relative'}
						color={'green.textLight'}>
						{t('modals.bank.sendMoneyTitle')}
						<Box pos={'absolute'} top={1} right={1}>
							<PopoverInfo
								title={t('ability.abilityDetailsTitle')}
								content={t('ability.abilityDetailsText')}
							/>
						</Box>
					</Box>
					<Formik
						initialValues={bonificoInitialValues}
						validationSchema={bonificoSchemaValidation}
						onSubmit={bonificoSubmit}>
						<Form style={{ textAlign: 'center' }}>
							<CreateSingleInput
								name={'money'}
								type={'text'}
								placeholder={t('modals.bank.money')}
							/>

							<CreateSingleInput
								name={'character'}
								type={'select'}
								placeholder={t('modals.bank.money')}
								fields={charactersList}
								fieldValue={'id'}
								fieldLabel={'fullname'}
							/>

							<CreateSubmitInput
								label={t('modals.bank.sendMoneySubmit')}
							/>
						</Form>
					</Formik>
				</>
			)}
		</Box>
	);
};
