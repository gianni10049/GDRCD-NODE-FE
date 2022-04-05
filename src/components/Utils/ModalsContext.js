import React, { createContext, useContext, useState } from 'react';
import Suspender from 'react-suspender';
import ModalBase from './Modals';

const modalContext = createContext({
	test: false,
	test2: false,
});

export const useModalContext = () => {
	return useContext(modalContext);
};

export const ModalContextProvider = ({ children }) => {
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

	return {
		loading: false,
		modalState: modalState,
		setModalState: (kind) => {
			setModalState({ ...modalState, ...kind });
		},
	};
};
