import React from 'react';
import ModalBase from './../Utils/Modals';
import { useSelector, useDispatch } from 'react-redux';
import { radioModalSelector, toggleRadioModal } from '../../redux/radioModal';

export const RadioModal = () => {
	let radioModal = useSelector(radioModalSelector);
	const dispatch = useDispatch();

	return (
		<>
			{radioModal?.open && (
				<ModalBase
					title={radioModal.title}
					component={radioModal.component}
					options={radioModal.options}
					dispatch={() => dispatch(toggleRadioModal({}))}
				/>
			)}
		</>
	);
};
