import { createSlice } from '@reduxjs/toolkit';
import { modalList } from '../components/Utils/ModalContext.model';
import i18n from './../i18n';

export const characterModals = createSlice({
	name: 'characterModal',
	initialState: {
		open: false,
		title: i18n.t('modals.character_page.title'),
		component: 'Profile',
	},
	reducers: {
		toggleCharacterModal: (state: modalList) => {
			state.open = !state.open;
		},
	},
});

export const { toggleCharacterModal } = characterModals.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const chracterModalsSelector = (state: any) => state.characterModals;

export default characterModals.reducer;
