import { configureStore } from '@reduxjs/toolkit';
import characterModals from './characterModals';
import AbilityDetailsModal from './abilityDetailsModal';
import DamageDetailsModal from './damageDetailsModal';

export default configureStore({
	reducer: {
		characterModals: characterModals,
		abilityDetailsModal: AbilityDetailsModal,
		damageDetailsModal: DamageDetailsModal,
	},
});
