import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('modals');
	let navigate = useNavigate();

	setTimeout(() => {
		navigate('/');
	}, 3000);

	return <a href={'/'}>Logged out</a>;
};

export default Logout;
