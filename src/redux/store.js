import { configureStore } from '@reduxjs/toolkit';
import modalsReducer from './modalsReducer';

export default configureStore({
	reducer: {
		modals: modalsReducer,
	},
});
