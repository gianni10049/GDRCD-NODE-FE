import React from 'react';
import ModalBase from './../Utils/Modals';
import { useSelector, useDispatch } from 'react-redux';
import { bankModalSelector, toggleBankModal } from '../../redux/bankModal';

export const BankModal = () => {
	let bankModal = useSelector(bankModalSelector);
	const dispatch = useDispatch();

	return (
		<>
			{bankModal?.open && (
				<ModalBase
					title={bankModal.title}
					component={bankModal.component}
					options={bankModal.options}
					dispatch={() => dispatch(toggleBankModal())}
				/>
			)}
		</>
	);
};
