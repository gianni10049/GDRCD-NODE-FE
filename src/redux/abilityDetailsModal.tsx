import { createSlice } from '@reduxjs/toolkit';
import { modalContentData } from '../components/Utils/ModalContext.model';
import i18n from './../i18n';

export const abilityDetailsModal = createSlice({
	name: 'abilityDetailsModal',
	initialState: {
		open: false,
		title: i18n.t('modals.ability_details.title'),
		component: 'AbilityDetails',
		options: {},
	},
	reducers: {
		toggleAbilityDetailModal: (state: modalContentData, data: any) => {
			state.open = !state.open;

			if (data.payload.options) {
				state.options = data.payload.options;
			}
		},
	},
});

export const { toggleAbilityDetailModal } = abilityDetailsModal.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const abilityDetailModalSelector = (state: any) =>
	state.abilityDetailsModal;

export default abilityDetailsModal.reducer;
