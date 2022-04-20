import { configureStore } from '@reduxjs/toolkit';
import characterModals from './characterModals';
import AbilityDetailsModal from './abilityDetailsModal';

export default configureStore({
	reducer: {
		characterModals: characterModals,
		abilityDetailsModal: AbilityDetailsModal,
	},
});
