import { createSlice } from '@reduxjs/toolkit';
import { modalContentData } from '../components/Utils/ModalContext.model';
import i18n from './../i18n';

export const BankModal = createSlice({
	name: 'bankModal',
	initialState: {
		open: false,
		title: i18n.t('modals.bank.title'),
		component: 'Bank',
		options: {},
	},
	reducers: {
		toggleBankModal: (state: modalContentData) => {
			state.open = !state.open;
		},
	},
});

export const { toggleBankModal } = BankModal.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const bankModalSelector = (state: any) => state.bankModal;

export default BankModal.reducer;
