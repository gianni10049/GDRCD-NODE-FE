import { isMineCharacterData, PermissionControlData } from './Permission.model';
import {
	isMineCharacterQuery,
	permissionControlQuery,
} from '../../apollo/Permission';

class Permission {
	static permissionControl = async (props: PermissionControlData) => {
		let { permission } = props;
		let data = await permissionControlQuery({ permission });
		return data.permissionControl.response;
	};

	static isMineCharacter = async (props: isMineCharacterData) => {
		let { characterId } = props;
		let data = await isMineCharacterQuery({
			characterId: characterId,
		});
		return data.isMineCharacter.response;
	};
}

export default Permission;
