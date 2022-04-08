import { PermissionControlData } from './Permission.model';
import { GQLQuery } from '../../apollo/GQL';
import { PERMISSION_CONTROL } from '../../apollo/Permission';

class Permission {
	static permissionControlQuery = async (permission: string) => {
		return await GQLQuery(PERMISSION_CONTROL, {
			permission: permission,
		});
	};

	static permissionControl = async (props: PermissionControlData) => {
		let { permission } = props;
		let data = await this.permissionControlQuery(permission);
		return data.permissionControl;
	};
}

export default Permission;
