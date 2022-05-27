import { createSlice } from '@reduxjs/toolkit';
import { modalContentData } from '../components/Utils/ModalContext.model';
import i18n from './../i18n';

export const MessagesModal = createSlice({
	name: 'messagesModal',
	initialState: {
		open: false,
		title: i18n.t('modals.messages.title'),
		component: 'Messages',
		options: {},
	},
	reducers: {
		toggleMessagesModal: (state: modalContentData, _data: any) => {
			state.open = !state.open;
		},
	},
});

export const { toggleMessagesModal } = MessagesModal.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const messagesModalSelector = (state: any) => state.messagesModal;

export default MessagesModal.reducer;
