import React from 'react';
import ModalBase from './../Utils/Modals';
import { useSelector, useDispatch } from 'react-redux';
import {
	marketModalSelector,
	toggleMarketModal,
} from '../../redux/marketModal';

export const MarketModal = () => {
	let marketModal = useSelector(marketModalSelector);
	const dispatch = useDispatch();

	return (
		<>
			{marketModal?.open && (
				<ModalBase
					title={marketModal.title}
					component={marketModal.component}
					options={marketModal.options}
					dispatch={() => dispatch(toggleMarketModal())}
				/>
			)}
		</>
	);
};
