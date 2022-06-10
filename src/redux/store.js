import { configureStore } from '@reduxjs/toolkit';
import characterModals from './characterModals';
import AbilityDetailsModal from './abilityDetailsModal';
import DamageDetailsModal from './damageDetailsModal';
import BankModal from './bankModal';
import MessagesModal from './messagesModal';
import RadioModal from './radioModal';
import GroupsModal from './groupsModal';
import ForumModal from './forumModal';

export default configureStore({
	reducer: {
		characterModals: characterModals,
		abilityDetailsModal: AbilityDetailsModal,
		damageDetailsModal: DamageDetailsModal,
		bankModal: BankModal,
		messagesModal: MessagesModal,
		radioModal: RadioModal,
		groupsModal: GroupsModal,
		forumModal: ForumModal,
	},
});
