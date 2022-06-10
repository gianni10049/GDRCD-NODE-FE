import { createSlice } from '@reduxjs/toolkit';
import { modalContentData } from '../components/Utils/ModalContext.model';
import i18n from './../i18n';

export const GroupsModal = createSlice({
	name: 'GroupsModal',
	initialState: {
		open: false,
		title: i18n.t('modals.groups.title'),
		component: 'Groups',
		options: {},
	},
	reducers: {
		toggleGroupsModal: (state: modalContentData, _data: any) => {
			state.open = !state.open;
		},
	},
});

export const { toggleGroupsModal } = GroupsModal.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const groupsModalSelector = (state: any) => state.groupsModal;

export default GroupsModal.reducer;
