import React, { createContext, useContext, useState } from 'react';
//@ts-ignore
import Suspender from 'react-suspender';
import ModalBase from './Modals';
import {
	ModalContextModals,
	ModalContextProviderData,
} from './ModalContext.model';

const modalContext = createContext<ModalContextModals>({
	loading: true,
	setModalState: () => {},
	modalState: {
		test: false,
		test2: false,
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
				{v.modalState.test && (
					<ModalBase content={<>Test modale 1</>} title={'TEST'} />
				)}

				{children}
			</Suspender>{' '}
		</modalContext.Provider>
	);
};

const ModalData = () => {
	const [modalState, setModalState] = useState({
		test: false,
		test2: false,
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
