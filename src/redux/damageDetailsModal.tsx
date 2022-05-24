import { createSlice } from '@reduxjs/toolkit';
import { modalContentData } from '../components/Utils/ModalContext.model';
import i18n from './../i18n';

export const DamageDetailsModal = createSlice({
	name: 'damageDetailsModal',
	initialState: {
		open: false,
		title: i18n.t('modals.damage_details.title'),
		component: 'DamageDetails',
		options: {},
	},
	reducers: {
		toggleDamageDetailModal: (state: modalContentData, data: any) => {
			if (data.payload.options) {
				if (state.options.damageId !== data.payload.options.damageId) {
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

export const { toggleDamageDetailModal } = DamageDetailsModal.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const damageDetailModalSelector = (state: any) =>
	state.damageDetailsModal;

export default DamageDetailsModal.reducer;
