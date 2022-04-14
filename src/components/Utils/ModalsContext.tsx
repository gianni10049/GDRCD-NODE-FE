import React from 'react';
import ModalBase from './Modals';
import { ModalContextProviderData } from './ModalContext.model';
import { useSelector } from 'react-redux';
import { selectModals } from '../../redux/modalsReducer';

export const ModalContextProvider = (data: ModalContextProviderData) => {
	let { children, routeData } = data;
	let v = useSelector(selectModals);

	return (
		<>
			{v && (
				<>
					{routeData.modal && (
						<>
							{v.character_page?.open && (
								<ModalBase modalStateVar={'character_page'} />
							)}
							{v.character_resources?.open && (
								<ModalBase
									modalStateVar={'character_resources'}
								/>
							)}
						</>
					)}
					{children}
				</>
			)}
		</>
	);
};
