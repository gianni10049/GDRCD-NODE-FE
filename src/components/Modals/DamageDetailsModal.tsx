import React from 'react';
import ModalBase from './../Utils/Modals';
import { useSelector, useDispatch } from 'react-redux';
import {
	damageDetailModalSelector,
	toggleDamageDetailModal,
} from '../../redux/damageDetailsModal';

export const DamageDetailsModal = () => {
	let damageDetailModals = useSelector(damageDetailModalSelector);
	const dispatch = useDispatch();

	return (
		<>
			{damageDetailModals?.open && (
				<ModalBase
					title={damageDetailModals.title}
					component={damageDetailModals.component}
					options={damageDetailModals.options}
					dispatch={() => dispatch(toggleDamageDetailModal({}))}
				/>
			)}
		</>
	);
};
