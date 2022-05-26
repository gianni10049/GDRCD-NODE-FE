import { configureStore } from '@reduxjs/toolkit';
import characterModals from './characterModals';
import AbilityDetailsModal from './abilityDetailsModal';
import DamageDetailsModal from './damageDetailsModal';
import BankModal from './bankModal';

export default configureStore({
	reducer: {
		characterModals: characterModals,
		abilityDetailsModal: AbilityDetailsModal,
		damageDetailsModal: DamageDetailsModal,
		bankModal: BankModal,
	},
});
