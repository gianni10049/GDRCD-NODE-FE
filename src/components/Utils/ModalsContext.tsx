import React, { createContext, useContext, useState } from 'react';
//@ts-ignore
import Suspender from 'react-suspender';
import ModalBase from './Modals';
import {
	ModalContextModals,
	ModalContextProviderData,
	modalList,
} from './ModalContext.model';

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
		<>
			{v && (
				<modalContext.Provider value={v}>
					<Suspender suspend={v.loading}>
						{v && v.modalState?.character_page?.open && (
							<ModalBase modalStateVar={'character_page'} />
						)}

						{v && v.modalState?.character_resources?.open && (
							<ModalBase modalStateVar={'character_resources'} />
						)}

						{children}
					</Suspender>{' '}
				</modalContext.Provider>
			)}
		</>
	);
};

const ModalData = () => {
	let storage = localStorage.getItem('modals'),
		defaultData = {
			character_page: {
				open: false,
				title: 'Profile',
				component: 'Profile',
			},
			character_resources: {
				open: false,
				title: 'Resources',
				component: 'Resources',
			},
		};

	const [modalState, setModalState] = useState<modalList>(
		storage ? JSON.parse(storage) : defaultData
	);

	// noinspection JSUnusedGlobalSymbols
	return {
		loading: false,
		modalState: modalState,
		setModalState: (kind: object) => {
			let new_data = { ...modalState, ...kind };
			setModalState(new_data);
			localStorage.setItem('modals', JSON.stringify(new_data));
		},
	};
};
