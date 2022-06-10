import { createSlice } from '@reduxjs/toolkit';
import { modalContentData } from '../components/Utils/ModalContext.model';
import i18n from './../i18n';

export const ForumModal = createSlice({
	name: 'forumModal',
	initialState: {
		open: false,
		title: i18n.t('modals.forum.title'),
		component: 'Forum',
		options: {},
	},
	reducers: {
		toggleForumModal: (state: modalContentData, _data: any) => {
			state.open = !state.open;
		},
	},
});

export const { toggleForumModal } = ForumModal.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const forumModalSelector = (state: any) => state.forumModal;

export default ForumModal.reducer;
