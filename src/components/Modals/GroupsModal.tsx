import React from 'react';
import ModalBase from './../Utils/Modals';
import { useSelector, useDispatch } from 'react-redux';
import {
	groupsModalSelector,
	toggleGroupsModal,
} from '../../redux/groupsModal';

export const GroupsModal = () => {
	let groupsModal = useSelector(groupsModalSelector);
	const dispatch = useDispatch();

	return (
		<>
			{groupsModal?.open && (
				<ModalBase
					title={groupsModal.title}
					component={groupsModal.component}
					options={groupsModal.options}
					// @ts-ignore
					dispatch={() => dispatch(toggleGroupsModal({}))}
				/>
			)}
		</>
	);
};
