import { createSlice } from '@reduxjs/toolkit';
import { modalContentData } from '../components/Utils/ModalContext.model';
import i18n from './../i18n';

export const RadioModal = createSlice({
	name: 'radioModal',
	initialState: {
		open: false,
		title: i18n.t('modals.radio.title'),
		component: 'Radio',
		options: {},
	},
	reducers: {
		toggleRadioModal: (state: modalContentData, _data: any) => {
			state.open = !state.open;
		},
	},
});

export const { toggleRadioModal } = RadioModal.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const radioModalSelector = (state: any) => state.radioModal;

export default RadioModal.reducer;
