import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { characterPointsTableData } from '../../../apollo/Tables.model';

export const CharPoints = (props: { points: characterPointsTableData }) => {
	let { points } = props;
	const { t } = useTranslation();

	useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return <>{points && <>{t('ability.abilityDetailsText')}</>}</>;
};
