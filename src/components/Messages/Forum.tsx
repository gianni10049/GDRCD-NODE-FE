import React, { useCallback, useEffect, useState } from 'react';
import {
	forumsData,
	forumsPostsData,
	forumsCommentsData,
	forumPostsResponse,
	forumsPostResponse,
} from '../../apollo/Messages.model';
import {
	Box,
	Image,
	Icon,
	Tooltip,
	AspectRatio,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
	changeClose,
	changeImportant,
	getForums,
	getPost,
	getPosts,
	newComment,
	newPost,
} from '../../apollo/Messages';
import * as Yup from 'yup';
import { toggleCharacterModal } from '../../redux/characterModals';
import { useDispatch } from 'react-redux';
import { BsFillBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import { Pagination } from '../Utils/Pagination';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { IoArrowBackCircle } from 'react-icons/io5';
import { AiFillLock, AiFillUnlock, AiOutlineReload } from 'react-icons/ai';
import { CreateSingleInput, CreateSubmitInput } from '../Utils/Formik';
import { Formik, Form } from 'formik';
import Permission from '../Utils/Permission';

export const Forum = () => {
	const { t } = useTranslation();
	const toast = useToast();
	let last_type = '';
	let stamp = false;
	const dispatch = useDispatch();

	// FORUMS
	const [forumsList, setfForumsList] = useState<forumsData[]>([]);
	const [forum, setForum] = useState<number>();

	// POSTS
	const [forumData, setForumData] = useState<forumsData>();
	const [postsList, setPostsList] = useState<forumPostsResponse>();
	const [page, setPage] = useState<number>(1);

	// POST
	const [post, setPost] = useState<number>();
	const [postData, setPostData] = useState<forumsPostResponse>();
	const [pagePost, setPagePost] = useState<number>(1);

	// NEW POST
	const [createPost, setCreatePost] = useState<boolean>(false);

	// NEW COMMENT
	const [createComment, setCreateComment] = useState<boolean>(false);

	// OTHER
	let [postsPermission, setPostsPermission] = useState<boolean>(false);

	const refetchData = useCallback(async () => {
		Permission.permissionControl({
			permission: 'MANAGE_POSTS',
		}).then((response) => {
			setPostsPermission(response);
		});

		if (!post) {
			if (!forum) {
				getForums({}).then((resp) => {
					setfForumsList(resp.getForums);
				});
			}

			if (forum) {
				getPosts({ forum, page }).then((resp) => {
					setPostsList(resp.getPosts);
				});
			}
		} else {
			getPost({ post, page: pagePost }).then((resp) => {
				setPostData(resp.getPost);
			});
		}
	}, [forum, page, pagePost, post]);

	useEffect(() => {
		refetchData();
	}, [refetchData]);

	let newPostInitialValues = {
		text: '',
		title: '',
	};
	const newPostValidation = Yup.object({
		text: Yup.string().required('required'),
		title: Yup.string().required('required'),
	});

	const newPostSubmit = async (data: any, actions: any) => {
		data.forum = forumData.id;

		newPost(data).then(() => {
			refetchData();
			actions.resetForm();
			setCreatePost(false);
			toast({
				title: t('modals.forum.createPostSuccess'),
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
		});
	};

	let newCommentInitialValues = {
		text: '',
	};
	const newCommentValidation = Yup.object({
		text: Yup.string().required('required'),
	});

	const newCommentSubmit = async (data: any, actions: any) => {
		data.post = postData?.post?.id;

		newComment(data).then(() => {
			refetchData();
			actions.resetForm();
			setCreateComment(false);
			toast({
				title: t('modals.forum.createCommentSuccess'),
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
		});
	};

	const updateClose = async (post: number) => {
		changeClose({ post }).then(() => {
			refetchData();
		});
	};

	const updateImportant = async (post: number) => {
		changeImportant({ post }).then(() => {
			refetchData();
		});
	};

	const selectForum = async (forum: forumsData) => {
		setForum(forum.id);
		setForumData(forum);
	};

	const selectPost = async (post: forumsPostsData) => {
		setPost(post.id);
	};

	const selectPage = async (data: any) => {
		setPage(data.selected + 1);
	};

	const selectPagePost = async (data: any) => {
		setPagePost(data.selected + 1);
	};

	return (
		<>
			<Box position={'absolute'} top={2} d={'flex'} h={'30px'}>
				<Tooltip
					hasArrow
					label={t('modals.forum.refetch')}
					bg={'green.light'}
					color={'green.text'}
					fontSize={'md'}
					fontFamily={'TecFont'}
					letterSpacing={'widest'}
					fontWeight={'extrabold'}>
					<Box
						mx={1}
						w={'6'}
						textAlign={'center'}
						h={'6'}
						bg={'green.lightOpacity'}
						rounded={'full'}>
						<Icon
							as={AiOutlineReload}
							boxSize={4}
							color={'green.textLight'}
							cursor={'pointer'}
							_hover={{
								color: 'green.light',
							}}
							onClick={refetchData}
						/>
					</Box>
				</Tooltip>
				{forum &&
					postsList &&
					!postData &&
					!createPost &&
					!createComment && (
						<>
							<Tooltip
								hasArrow
								label={t('modals.forum.addPost')}
								bg={'green.light'}
								color={'green.text'}
								fontSize={'md'}
								fontFamily={'TecFont'}
								letterSpacing={'widest'}
								fontWeight={'extrabold'}>
								<Box
									mx={1}
									w={'6'}
									textAlign={'center'}
									h={'6'}
									bg={'green.lightOpacity'}
									rounded={'full'}>
									<Icon
										as={BsFillPlusCircleFill}
										boxSize={4}
										color={'green.textLight'}
										cursor={'pointer'}
										_hover={{
											color: 'green.light',
										}}
										onClick={() => setCreatePost(true)}
									/>
								</Box>
							</Tooltip>
							<Tooltip
								hasArrow
								label={t('modals.forum.back')}
								bg={'green.light'}
								color={'green.text'}
								fontSize={'md'}
								fontFamily={'TecFont'}
								letterSpacing={'widest'}
								fontWeight={'extrabold'}>
								<Box
									mx={1}
									w={'6'}
									textAlign={'center'}
									h={'6'}
									bg={'green.lightOpacity'}
									rounded={'full'}>
									<Icon
										as={IoArrowBackCircle}
										boxSize={5}
										color={'green.textLight'}
										cursor={'pointer'}
										_hover={{
											color: 'green.light',
										}}
										onClick={() => {
											setPostsList(null);
											setForumData(null);
											setForum(null);
										}}
									/>
								</Box>
							</Tooltip>
						</>
					)}

				{post && postData && !createPost && !createComment && (
					<>
						{!postData.post.closed && (
							<Tooltip
								hasArrow
								label={t('modals.forum.addComment')}
								bg={'green.light'}
								color={'green.text'}
								fontSize={'md'}
								fontFamily={'TecFont'}
								letterSpacing={'widest'}
								fontWeight={'extrabold'}>
								<Box
									mx={1}
									w={'6'}
									textAlign={'center'}
									h={'6'}
									bg={'green.lightOpacity'}
									rounded={'full'}>
									<Icon
										as={BsFillPlusCircleFill}
										boxSize={4}
										color={'green.textLight'}
										cursor={'pointer'}
										_hover={{
											color: 'green.light',
										}}
										onClick={() => setCreateComment(true)}
									/>
								</Box>
							</Tooltip>
						)}
						<Tooltip
							hasArrow
							label={t('modals.forum.back')}
							bg={'green.light'}
							color={'green.text'}
							fontSize={'md'}
							fontFamily={'TecFont'}
							letterSpacing={'widest'}
							fontWeight={'extrabold'}>
							<Box
								mx={1}
								w={'6'}
								textAlign={'center'}
								h={'6'}
								bg={'green.lightOpacity'}
								rounded={'full'}>
								<Icon
									as={IoArrowBackCircle}
									boxSize={5}
									color={'green.textLight'}
									cursor={'pointer'}
									_hover={{
										color: 'green.light',
									}}
									onClick={() => {
										setPost(null);
										setPostData(null);
									}}
								/>
							</Box>
						</Tooltip>
						{postsPermission && (
							<>
								<Tooltip
									hasArrow
									label={
										postData.post.closed
											? t('modals.forum.closed')
											: t('modals.forum.open')
									}
									bg={'green.light'}
									color={'green.text'}
									fontSize={'md'}
									fontFamily={'TecFont'}
									letterSpacing={'widest'}
									fontWeight={'extrabold'}>
									<Box
										mx={1}
										w={'6'}
										textAlign={'center'}
										h={'6'}
										bg={'green.lightOpacity'}
										rounded={'full'}>
										<Icon
											as={
												postData.post.closed
													? AiFillLock
													: AiFillUnlock
											}
											boxSize={5}
											color={'green.textLight'}
											cursor={'pointer'}
											_hover={{
												color: 'green.light',
											}}
											onClick={() =>
												updateClose(postData.post.id)
											}
										/>
									</Box>
								</Tooltip>
								<Tooltip
									hasArrow
									label={
										postData.post.important
											? t('modals.forum.important')
											: t('modals.forum.notImportant')
									}
									bg={'green.light'}
									color={'green.text'}
									fontSize={'md'}
									fontFamily={'TecFont'}
									letterSpacing={'widest'}
									fontWeight={'extrabold'}>
									<Box
										mx={1}
										w={'6'}
										textAlign={'center'}
										h={'6'}
										bg={'green.lightOpacity'}
										rounded={'full'}>
										<Icon
											as={
												postData.post.important
													? BsFillBookmarkStarFill
													: BsBookmarkStar
											}
											boxSize={4}
											color={'green.textLight'}
											cursor={'pointer'}
											_hover={{
												color: 'green.light',
											}}
											onClick={() =>
												updateImportant(
													postData.post.id
												)
											}
										/>
									</Box>
								</Tooltip>
							</>
						)}
					</>
				)}

				{createPost && (
					<Tooltip
						hasArrow
						label={t('modals.forum.back')}
						bg={'green.light'}
						color={'green.text'}
						fontSize={'md'}
						fontFamily={'TecFont'}
						letterSpacing={'widest'}
						fontWeight={'extrabold'}>
						<Box
							mx={1}
							w={'6'}
							textAlign={'center'}
							h={'6'}
							bg={'green.lightOpacity'}
							rounded={'full'}>
							<Icon
								as={IoArrowBackCircle}
								boxSize={5}
								color={'green.textLight'}
								cursor={'pointer'}
								_hover={{
									color: 'green.light',
								}}
								onClick={() => {
									setCreatePost(false);
								}}
							/>
						</Box>
					</Tooltip>
				)}

				{createComment && (
					<Tooltip
						hasArrow
						label={t('modals.forum.back')}
						bg={'green.light'}
						color={'green.text'}
						fontSize={'md'}
						fontFamily={'TecFont'}
						letterSpacing={'widest'}
						fontWeight={'extrabold'}>
						<Box
							mx={1}
							w={'6'}
							textAlign={'center'}
							h={'6'}
							bg={'green.lightOpacity'}
							rounded={'full'}>
							<Icon
								as={IoArrowBackCircle}
								boxSize={5}
								color={'green.textLight'}
								cursor={'pointer'}
								_hover={{
									color: 'green.light',
								}}
								onClick={() => {
									setCreateComment(false);
								}}
							/>
						</Box>
					</Tooltip>
				)}
			</Box>

			{!forum && !createPost && !createComment && (
				<>
					<Box w={'75%'} m={'0 auto'} d={'flex'} flexWrap={'wrap'}>
						{forumsList?.map((forum: forumsData, i: number) => {
							if (last_type !== forum.type) {
								stamp = true;
								last_type = forum.type;
							} else {
								stamp = false;
							}

							return (
								<>
									{stamp && (
										<Box
											w={'full'}
											color={'green.light'}
											fontWeight={'bold'}
											textAlign={'center'}
											fontSize={20}
											borderColor={'green.light'}
											borderWidth={'0 0 1px 0'}>
											{forum.type}
										</Box>
									)}

									<Box
										key={i}
										minW={'50px'}
										bg={'green.lightOpacity'}
										m={'5px'}
										p={5}>
										<Box
											padding={'5px 0 5px 0'}
											d={'flex'}
											color={'green.textLight'}
											fontSize={13}
											alignItems={'center'}>
											<Text
												cursor={'pointer'}
												_hover={{
													color: 'green.light',
												}}
												onClick={() =>
													selectForum(forum)
												}>
												{forum.name}
											</Text>
										</Box>
									</Box>
								</>
							);
						})}
					</Box>
				</>
			)}

			{forum && postsList && !postData && !createPost && !createComment && (
				<>
					<Box
						w={'full'}
						color={'green.light'}
						fontWeight={'bold'}
						textAlign={'center'}
						fontSize={20}
						borderColor={'green.light'}
						borderWidth={'0 0 1px 0'}>
						{forumData.name}
					</Box>
					<Box
						w={'90%'}
						m={'0 auto'}
						h={'calc(100% - 70px)'}
						overflow={'hidden'}>
						<Box
							w={'full'}
							padding={'5px 0 5px 0'}
							d={'flex'}
							fontSize={20}
							color={'green.light'}
							textAlign={'center'}
							alignItems={'center'}
							borderColor={'green.light'}
							borderWidth={'0 0 1px 0'}>
							<Box
								w={'33%'}
								cursor={'pointer'}
								_hover={{
									color: 'green.light',
								}}>
								Titolo
							</Box>
							<Box
								w={'33%'}
								cursor={'pointer'}
								_hover={{
									color: 'green.light',
								}}>
								Autore
							</Box>
							<Box
								w={'33%'}
								cursor={'pointer'}
								_hover={{
									color: 'green.light',
								}}>
								Ultima risposta
							</Box>
						</Box>
						<Box h={'calc(100% - 40px)'} overflow={'auto'}>
							{postsList?.posts?.map((post: forumsPostsData) => {
								return (
									<>
										<Box
											w={'full'}
											d={'flex'}
											alignItems={'stretch'}
											color={'green.textLight'}
											fontSize={13}
											m={'5px 0'}
											textAlign={'center'}>
											<Tooltip
												hasArrow
												label={t(
													'modals.forum.openPost'
												)}
												bg={'green.light'}
												color={'green.text'}
												fontSize={'md'}
												fontFamily={'TecFont'}
												letterSpacing={'widest'}
												fontWeight={'extrabold'}>
												<Box
													d={'flex'}
													alignItems={'center'}
													justifyContent={'center'}
													w={'33%'}
													padding={'5px 0'}
													cursor={'pointer'}
													_hover={{
														color: 'green.light',
														bg: 'green.lightOpacity',
													}}
													onClick={() =>
														selectPost(post)
													}
													border={'solid'}
													borderColor={'green.light'}
													borderWidth={
														'1px 0 1px 1px '
													}>
													{post.important && (
														<Icon
															mr={2}
															as={
																BsFillBookmarkStarFill
															}
															color={
																'green.light'
															}
															boxSize={4}
														/>
													)}
													{post.closed && (
														<Icon
															mr={2}
															as={AiFillLock}
															color={
																'green.light'
															}
															boxSize={4}
														/>
													)}
													{post.title}
												</Box>
											</Tooltip>
											<Tooltip
												hasArrow
												label={t(
													'modals.forum.openCharacter'
												)}
												bg={'green.light'}
												color={'green.text'}
												fontSize={'md'}
												fontFamily={'TecFont'}
												letterSpacing={'widest'}
												fontWeight={'extrabold'}>
												<Box
													w={'33%'}
													alignItems={'center'}
													justifyContent={'center'}
													padding={'5px 0'}
													cursor={'pointer'}
													border={'solid'}
													borderColor={'green.light'}
													borderWidth={
														'1px 0 1px 1px'
													}
													onClick={() => {
														dispatch(
															toggleCharacterModal(
																{
																	options: {
																		character:
																			post?.character,
																	},
																}
															)
														);
													}}
													_hover={{
														color: 'green.light',
														bg: 'green.lightOpacity',
													}}>
													<Text>
														{
															post?.characterData
																?.fullname
														}
													</Text>
													<Text>
														{moment(
															Number(
																post?.createdAt
															)
														)?.format(
															'HH:mm DD/MM/YYYY'
														)}
													</Text>
												</Box>
											</Tooltip>
											<Box
												w={'33%'}
												padding={'5px 0'}
												border={'solid'}
												borderColor={'green.light'}
												borderWidth={'1px'}>
												{post?.commentsData[
													post?.commentsData?.length -
														1
												] ? (
													<>
														<Text
															color={
																'green.light'
															}>
															{
																post
																	?.characterData
																	?.fullname
															}
														</Text>{' '}
														<Text
															color={
																'green.light'
															}
															fontWeight={'bold'}>
															{moment(
																Number(
																	post
																		?.commentsData[
																		post
																			?.commentsData
																			?.length -
																			1
																	]?.createdAt
																)
															)?.format(
																'HH:mm DD/MM/YYYY'
															)}
														</Text>
													</>
												) : (
													<Text fontSize={11}>
														{t(
															'modals.forum.noResponse'
														)}
													</Text>
												)}
											</Box>
										</Box>
									</>
								);
							})}
						</Box>
					</Box>

					<Pagination
						total_pages={postsList.total_pages}
						selectPage={selectPage}
						page={page}
					/>
				</>
			)}

			{post && postData && !createPost && !createComment && (
				<Box w={'full'} h={'full'} overflow={'auto'}>
					<Box
						w={'full'}
						color={'green.light'}
						fontWeight={'bold'}
						textAlign={'center'}
						fontSize={20}
						borderColor={'green.light'}
						borderWidth={'0 0 1px 0'}>
						{postData?.post?.title}
					</Box>

					<Box h={'calc(100% - 80px)'} overflow={'auto'} mt={2}>
						<Box
							w={'full'}
							color={'green.light'}
							fontWeight={'bold'}
							textAlign={'center'}
							fontSize={20}
							borderColor={'green.light'}
							borderWidth={'0 0 1px 0'}>
							{t('modals.forum.fatherPost')}
						</Box>
						<Box
							mt={5}
							d={'flex'}
							borderColor={'green.light'}
							borderWidth={'1px'}
							alignItems={'stretch'}
							minH={'150px'}>
							<Box
								flexWrap={'wrap'}
								w={'20%'}
								justifyContent={'center'}
								textAlign={'center'}
								minH={'full'}
								borderRight={'1px solid'}
								borderColor={'green.light'}>
								<Box>
									<AspectRatio
										w='40px'
										m={'10px auto'}
										ratio={1}
										borderRadius={'full'}
										overflow={'hidden'}
										borderColor={'green.light'}
										border={'1px solid'}>
										<Image
											w={'full'}
											h={'full'}
											objectFit={'cover'}
											objectPosition={'center'}
											src={
												postData?.post?.characterData
													?.mini_avatar
											}
											alt={''}
										/>
									</AspectRatio>
								</Box>
								<Box
									bg={'green.backgroundDark'}
									w={'80%'}
									m={'auto'}
									border={'1px solid'}
									borderColor={'green.border'}
									color={'green.textLight'}
									_hover={{
										color: 'green.light',
										bg: 'green.lightOpacity',
									}}
									onClick={() =>
										dispatch(
											toggleCharacterModal({
												options: {
													character:
														postData?.post
															?.characterData?.id,
												},
											})
										)
									}
									cursor={'pointer'}>
									<Text fontSize={15}>
										{postData?.post?.characterData.name}
									</Text>
									<Text fontSize={11}>
										{postData?.post?.characterData.surname}
									</Text>
								</Box>
							</Box>
							<Box
								w={'80%'}
								textAlign={'left'}
								minH={'full'}
								p={2}>
								<Text
									color={'green.light'}
									textAlign={'right'}
									fontSize={17}>
									{moment(
										Number(postData?.post?.createdAt)
									)?.format('HH:mm DD/MM/YYYY')}
								</Text>
								<Text
									color={'green.textLight'}
									fontSize={16}
									fontFamily={'RegularText'}
									textAlign={'justify'}
									boxSizing={'border-box'}>
									{postData?.post?.text}
								</Text>
							</Box>
						</Box>

						<Box
							w={'full'}
							color={'green.light'}
							fontWeight={'bold'}
							textAlign={'center'}
							fontSize={20}
							borderColor={'green.light'}
							borderWidth={'0 0 1px 0'}>
							{t('modals.forum.comments')} - Pagina {pagePost}
						</Box>

						{postData?.post?.commentsData?.map(
							(data: forumsCommentsData) => (
								<Box
									mt={2}
									d={'flex'}
									borderColor={'green.light'}
									borderWidth={'1px'}
									alignItems={'stretch'}
									minH={'150px'}>
									<Box
										flexWrap={'wrap'}
										w={'20%'}
										justifyContent={'center'}
										textAlign={'center'}
										minH={'full'}
										borderRight={'1px solid'}
										borderColor={'green.light'}>
										<Box>
											<AspectRatio
												w='40px'
												m={'10px auto'}
												ratio={1}
												borderRadius={'full'}
												overflow={'hidden'}
												borderColor={'green.light'}
												border={'1px solid'}>
												<Image
													w={'full'}
													h={'full'}
													objectFit={'cover'}
													objectPosition={'center'}
													src={
														data?.characterData
															?.mini_avatar
													}
													alt={''}
												/>
											</AspectRatio>
										</Box>
										<Box
											onClick={() =>
												dispatch(
													toggleCharacterModal({
														options: {
															character:
																data
																	?.characterData
																	?.id,
														},
													})
												)
											}>
											<Text
												color={'green.light'}
												fontSize={15}>
												{data?.characterData?.name}
											</Text>
											<Text
												color={'green.light'}
												fontSize={11}>
												{data?.characterData?.surname}
											</Text>
										</Box>
									</Box>
									<Box
										w={'80%'}
										textAlign={'left'}
										minH={'full'}
										p={2}>
										<Text
											color={'green.light'}
											textAlign={'right'}
											fontSize={17}>
											{moment(
												Number(data?.createdAt)
											)?.format('HH:mm DD/MM/YYYY')}
										</Text>
										<Text
											color={'green.textLight'}
											fontSize={16}
											fontFamily={'RegularText'}
											textAlign={'justify'}
											boxSizing={'border-box'}>
											{data?.text}
										</Text>
									</Box>
								</Box>
							)
						)}

						<Formik
							initialValues={newCommentInitialValues}
							validationSchema={newCommentValidation}
							onSubmit={newCommentSubmit}>
							<Form>
								<Box
									h={'full'}
									w={'90%'}
									m={'auto'}
									mt={3}
									overflow={'auto'}>
									<CreateSingleInput
										name={'text'}
										type={'textarea'}
										placeholder={'Testo'}
										height={'250px'}
										resize={'y'}
									/>
									<Box mt={2}>
										<CreateSubmitInput label={'Commenta'} />
									</Box>
								</Box>
							</Form>
						</Formik>
					</Box>

					<Pagination
						total_pages={postData?.total_pages}
						selectPage={selectPagePost}
						page={pagePost}
					/>
				</Box>
			)}

			{createPost && (
				<>
					<Box
						w={'full'}
						color={'green.light'}
						fontWeight={'bold'}
						textAlign={'center'}
						fontSize={20}
						borderColor={'green.light'}
						borderWidth={'0 0 1px 0'}>
						{t('modals.forum.newPost')} {forumData?.name}
					</Box>
					<Formik
						initialValues={newPostInitialValues}
						validationSchema={newPostValidation}
						onSubmit={newPostSubmit}
						className={'h-full'}>
						<Form style={{ height: '100%' }}>
							<Box
								h={'full'}
								w={'90%'}
								m={'auto'}
								overflow={'auto'}>
								<CreateSingleInput
									width={'full'}
									name={'title'}
									type={'text'}
									placeholder={'Titolo'}
								/>
								<CreateSingleInput
									name={'text'}
									type={'textarea'}
									placeholder={'Testo'}
									height={'250px'}
									resize={'y'}
								/>
								<Box mt={2}>
									<CreateSubmitInput label={'Crea'} />
								</Box>
							</Box>
						</Form>
					</Formik>
				</>
			)}

			{createComment && (
				<>
					<Box
						w={'full'}
						color={'green.light'}
						fontWeight={'bold'}
						textAlign={'center'}
						fontSize={20}
						borderColor={'green.light'}
						borderWidth={'0 0 1px 0'}>
						{t('modals.forum.newComment')} {postData?.post?.title}
					</Box>
					<Formik
						initialValues={newCommentInitialValues}
						validationSchema={newCommentValidation}
						onSubmit={newCommentSubmit}>
						<Form>
							<Box
								h={'full'}
								w={'90%'}
								m={'auto'}
								mt={3}
								overflow={'auto'}>
								<CreateSingleInput
									name={'text'}
									type={'textarea'}
									placeholder={'Testo'}
									height={'250px'}
									resize={'y'}
								/>
								<Box mt={2}>
									<CreateSubmitInput label={'Commenta'} />
								</Box>
							</Box>
						</Form>
					</Formik>
				</>
			)}
		</>
	);
};
