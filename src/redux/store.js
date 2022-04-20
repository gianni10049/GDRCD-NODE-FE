import { configureStore } from '@reduxjs/toolkit';
import characterModals from './characterModals';

export default configureStore({
	reducer: {
		characterModals: characterModals,
	},
});
