const Page404 = (props) => {
	let { code } = props;

	switch (Number(code)) {
		case 404:
			return <>Page not found</>;
		case 403:
			return <>Permission Denied</>;
		default:
			return <>Error.</>;
	}
};

export default Page404;
