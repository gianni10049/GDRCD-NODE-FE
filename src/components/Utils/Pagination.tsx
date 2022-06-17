import React from 'react';
import ReactPaginate from 'react-paginate';
import { Box } from '@chakra-ui/react';

export const Pagination = (props: {
	total_pages: number;
	selectPage: any;
	page: number;
}) => {
	let { total_pages, selectPage, page } = props;

	return (
		<Box
			color={'green.textLight'}
			pos={'absolute'}
			d={'flex'}
			flexWrap={'wrap'}
			bottom={3}
			w={'full'}>
			{/*@ts-ignore*/}
			<ReactPaginate
				nextLabel='next >'
				onPageChange={selectPage}
				pageRangeDisplayed={3}
				marginPagesDisplayed={1}
				pageCount={total_pages}
				renderOnZeroPageCount={null}
				previousLabel='< previous'
				pageClassName='px-3'
				pageLinkClassName='text-green-textLight hover:text-green-light'
				previousLinkClassName='text-green-textLight  hover:text-green-light mr-5'
				nextLinkClassName='text-green-textLight  hover:text-green-light ml-5'
				breakLabel='...'
				breakLinkClassName='text-green-textLight'
				containerClassName='pagination m-auto max-w-full'
				activeLinkClassName={
					'text-green-lightOpacity hover:text-green-lightOpacity cursor-default '
				}
				forcePage={page - 1}
			/>
		</Box>
	);
};
