import React from 'react';
import ModalBase from './../Utils/Modals';
import { useSelector, useDispatch } from 'react-redux';
import {
	characterModalsSelector,
	toggleCharacterModal,
} from '../../redux/characterModals';

export const CharacterModal = () => {
	let characterModals = useSelector(characterModalsSelector);
	const dispatch = useDispatch();

	return (
		<>
			{characterModals?.open && (
				<ModalBase
					title={characterModals.title}
					component={characterModals.component}
					options={characterModals.options}
					dispatch={() => dispatch(toggleCharacterModal({}))}
				/>
			)}
		</>
	);
};
