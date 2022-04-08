import { gql } from '@apollo/client';

const PERMISSION_CONTROL = gql`
	query permissionControl($token: String!, $permission: String!) {
		permissionControl(token: $token, permission: $permission) {
			response
			responseStatus
		}
	}
`;

export { PERMISSION_CONTROL };
