import { isMineCharacterData, PermissionControlData } from './Permission.model';
import { GQLQuery } from '../../apollo/GQL';
import { IS_MINE_CHARACTER, PERMISSION_CONTROL } from '../../apollo/Permission';

class Permission {
	static permissionControlQuery = async (permission: string) => {
		return await GQLQuery(PERMISSION_CONTROL, {
			permission: permission,
		});
	};

	static permissionControl = async (props: PermissionControlData) => {
		let { permission } = props;
		let data = await this.permissionControlQuery(permission);
		return data.permissionControl.response;
	};

	static isMineCharacterQuery = async (characterId: number) => {
		return await GQLQuery(IS_MINE_CHARACTER, {
			characterId: characterId,
		});
	};

	static isMineCharacter = async (props: isMineCharacterData) => {
		let { characterId } = props;
		let data = await this.isMineCharacterQuery(characterId);
		return data.isMineCharacter.response;
	};
}

export default Permission;
