import { createSlice } from '@reduxjs/toolkit';
import { modalContentData } from '../components/Utils/ModalContext.model';
import i18n from './../i18n';

export const MarketModal = createSlice({
	name: 'marketModal',
	initialState: {
		open: false,
		title: i18n.t('modals.market.title'),
		component: 'Market',
		options: {},
	},
	reducers: {
		toggleMarketModal: (state: modalContentData) => {
			state.open = !state.open;
		},
	},
});

export const { toggleMarketModal } = MarketModal.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const marketModalSelector = (state: any) => state.marketModal;

export default MarketModal.reducer;
