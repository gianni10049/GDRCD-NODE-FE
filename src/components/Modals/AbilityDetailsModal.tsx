import React from 'react';
import ModalBase from './../Utils/Modals';
import { useSelector, useDispatch } from 'react-redux';
import {
	abilityDetailModalSelector,
	toggleAbilityDetailModal,
} from '../../redux/abilityDetailsModal';

export const AbilityDetailsModal = () => {
	let abilityDetailModals = useSelector(abilityDetailModalSelector);
	const dispatch = useDispatch();

	return (
		<>
			{abilityDetailModals?.open && (
				<ModalBase
					title={abilityDetailModals.title}
					component={abilityDetailModals.component}
					options={abilityDetailModals.options}
					// @ts-ignore
					dispatch={() => dispatch(toggleAbilityDetailModal({}))}
				/>
			)}
		</>
	);
};
