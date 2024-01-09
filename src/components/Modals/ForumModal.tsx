import React from 'react';
import ModalBase from './../Utils/Modals';
import { useSelector, useDispatch } from 'react-redux';
import { forumModalSelector, toggleForumModal } from '../../redux/forumModal';

export const ForumModal = () => {
	let radioModal = useSelector(forumModalSelector);
	const dispatch = useDispatch();

	return (
		<>
			{radioModal?.open && (
				<ModalBase
					title={radioModal.title}
					component={radioModal.component}
					options={radioModal.options}
					// @ts-ignore
					dispatch={() => dispatch(toggleForumModal({}))}
				/>
			)}
		</>
	);
};
