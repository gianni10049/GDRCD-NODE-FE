import React from 'react';

const Logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('modals');

	setTimeout(() => {
		window.location.href = '/';
	}, 3000);

	return <a href={'/'}>Logged out</a>;
};

export default Logout;
