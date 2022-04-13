import React, { createContext, useContext, useState } from 'react';
//@ts-ignore
import Suspender from 'react-suspender';
import ModalBase from './Modals';
import {
	ModalContextModals,
	ModalContextProviderData,
	modalList,
} from './ModalContext.model';
import { useTranslation } from 'react-i18next';

const modalContext = createContext<ModalContextModals>({
	loading: true,
});

export const useModalContext = () => {
	return useContext(modalContext);
};

export const ModalContextProvider = (data: ModalContextProviderData) => {
	let { children, routeData } = data;
	let v = ModalData();

	return (
		<>
			{v && (
				<modalContext.Provider value={v}>
					<Suspender suspend={v.loading}>
						{routeData.modal && (
							<>
								{v && v.modalState?.character_page?.open && (
									<ModalBase
										modalStateVar={'character_page'}
									/>
								)}

								{v &&
									v.modalState?.character_resources?.open && (
										<ModalBase
											modalStateVar={
												'character_resources'
											}
										/>
									)}
							</>
						)}

						{children}
					</Suspender>{' '}
				</modalContext.Provider>
			)}
		</>
	);
};

const ModalData = () => {
	const { t } = useTranslation();

	let storage = localStorage.getItem('modals'),
		defaultData = {
			character_page: {
				open: false,
				title: t('modals.character_page.title'),
				component: 'Profile',
			},
			character_resources: {
				open: false,
				title: t('modals.character_resources.title'),
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
