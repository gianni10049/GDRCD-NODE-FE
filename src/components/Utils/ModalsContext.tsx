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
	setModalState: () => {},
	modalState: {
		character_page: {
			open: false,
		},
		character_resources: {
			open: false,
		},
	},
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
					<ModalBase content={<CharacterProfile />} title={'TEST'} />
				)}

				{v.modalState.character_resources.open && (
					<ModalBase
						content={<CharacterProfile />}
						title={'Resources'}
					/>
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
		},
		character_resources: {
			open: false,
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
