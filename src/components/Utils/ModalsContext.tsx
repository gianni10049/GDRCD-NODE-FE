import React from 'react';
import ModalBase from './Modals';
import { ModalContextProviderData } from './ModalContext.model';
import { useSelector, useDispatch } from 'react-redux';
import { chracterModalsSelector } from '../../redux/characterModals';
import { toggleCharacterModal } from '../../redux/characterModals';

export const ModalContextProvider = (data: ModalContextProviderData) => {
	let { routeData } = data;
	let characterModals = useSelector(chracterModalsSelector);
	const dispatch = useDispatch();

	return (
		<>
			{routeData.modal && (
				<>
					{characterModals.open && (
						<ModalBase
							title={characterModals.title}
							component={characterModals.component}
							options={characterModals.options}
							dispatch={() => dispatch(toggleCharacterModal())}
						/>
					)}
				</>
			)}
		</>
	);
};
