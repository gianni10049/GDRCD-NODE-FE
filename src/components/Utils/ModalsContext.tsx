import React from 'react';
import { ModalContextProviderData } from './ModalContext.model';
import { CharacterModal } from '../Modals/CharacterModal';
import { AbilityDetailsModal } from '../Modals/AbilityDetailsModal';

export const ModalContextProvider = (data: ModalContextProviderData) => {
	let { routeData } = data;

	return (
		<>
			{routeData.modal && (
				<>
					<CharacterModal />
					<AbilityDetailsModal />
				</>
			)}
		</>
	);
};
