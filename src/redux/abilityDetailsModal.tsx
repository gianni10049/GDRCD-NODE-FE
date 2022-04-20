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
			if (data.payload.options) {
				if (
					state.options.abilityId !== data.payload.options.abilityId
				) {
					state.options = data.payload.options;
					if (!state.open) {
						state.open = true;
					}
				} else {
					state.open = !state.open;
				}
			} else {
				state.open = !state.open;
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
