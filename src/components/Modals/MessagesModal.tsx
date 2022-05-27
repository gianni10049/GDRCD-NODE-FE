import React from 'react';
import ModalBase from './../Utils/Modals';
import { useSelector, useDispatch } from 'react-redux';
import {
	messagesModalSelector,
	toggleMessagesModal,
} from '../../redux/messagesModal';

export const MessagesModal = () => {
	let messagesModal = useSelector(messagesModalSelector);
	const dispatch = useDispatch();

	return (
		<>
			{messagesModal?.open && (
				<ModalBase
					title={messagesModal.title}
					component={messagesModal.component}
					options={messagesModal.options}
					dispatch={() => dispatch(toggleMessagesModal({}))}
				/>
			)}
		</>
	);
};
