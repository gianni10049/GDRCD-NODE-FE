import { createSlice } from '@reduxjs/toolkit';
import { chatStorageModel } from './ChatStorageInterface.model';

export const ChatStorage = createSlice({
	name: 'chatStorage',
	initialState: {
		isInChat: false,
	},
	reducers: {
		setIsInChat: (state: chatStorageModel, data: { payload: boolean }) => {
			state.isInChat = data.payload;
		},
	},
});

export const { setIsInChat } = ChatStorage.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const chatStorageSelector = (state: any) => state.chatStorage;

export default ChatStorage.reducer;
