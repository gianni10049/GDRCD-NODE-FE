import React from 'react';
import { Box } from '@chakra-ui/react';
import { AbilityDetailsData } from './AbilityDetails.modal';

export const AbilityDetails = (props: AbilityDetailsData) => {
	let { abilityId } = props.options;

	return <Box color={'white'}>Prova abi {abilityId}</Box>;
};
