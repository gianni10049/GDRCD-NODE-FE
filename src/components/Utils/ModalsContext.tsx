import React, { createContext, useContext, useState } from 'react';
//@ts-ignore
import Suspender from 'react-suspender';
import ModalBase from './Modals';
import {
	ModalContextModals,
	ModalContextProviderData,
} from './ModalContext.model';
import CharacterProfile from '../Character/character_profile';

const modalContext = createContext<ModalContextModals>({
	loading: true,
});

export const useModalContext = () => {
	return useContext(modalContext);
};

export const ModalContextProvider = (data: ModalContextProviderData) => {
	let { children } = data;
	let v = ModalData();

	return (
		<modalContext.Provider value={v}>
			<Suspender suspend={v.loading}>
				{v.modalState.character_page.open && (
					<ModalBase modalStateVar={'character_page'} />
				)}

				{v.modalState.character_resources.open && (
					<ModalBase modalStateVar={'character_resources'} />
				)}

				{children}
			</Suspender>{' '}
		</modalContext.Provider>
	);
};

const ModalData = () => {
	const [modalState, setModalState] = useState({
		character_page: {
			open: false,
			title: 'Profile',
			component: CharacterProfile,
			options: {
				character: 1,
			},
		},
		character_resources: {
			open: false,
			title: 'Resources',
		},
	});

	// noinspection JSUnusedGlobalSymbols
	return {
		loading: false,
		modalState: modalState,
		setModalState: (kind: object) => {
			setModalState({ ...modalState, ...kind });
		},
	};
};
