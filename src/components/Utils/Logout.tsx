import React from 'react';

const Logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('modal');

	return <>Logged out</>;
};

export default Logout;
