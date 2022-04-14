import { createSlice } from '@reduxjs/toolkit';
import { modalList } from '../components/Utils/ModalContext.model';
import i18n from './../i18n';

export const getInitialState = () => {
	let storage = localStorage.getItem('modals');

	if (storage) {
		return JSON.parse(storage);
	} else {
		return {
			character_page: {
				open: false,
				title: i18n.t('modals.character_page.title'),
				component: 'Profile',
			},
			character_resources: {
				open: false,
				title: i18n.t('modals.character_resources.title'),
				component: 'Resources',
			},
		};
	}
};

export const modalsReduced = createSlice({
	name: 'modals',
	initialState: getInitialState(),
	reducers: {
		toggleModal: (state: modalList, data) => {
			let varName = data.payload.kind;

			state[varName].open = !state[varName].open;
			if (data.payload.options) {
				state[varName].options = data.payload.options;
			}

			localStorage.setItem('modals', JSON.stringify(state));
		},
	},
});

export const { toggleModal } = modalsReduced.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectModals = (state: any) => state.modals;

export default modalsReduced.reducer;
