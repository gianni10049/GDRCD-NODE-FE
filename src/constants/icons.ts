import { BiCoinStack } from 'react-icons/bi';
import { BsFillQuestionDiamondFill } from 'react-icons/bs';
import { GiSwitchWeapon, GiDropWeapon } from 'react-icons/gi';

export const iconsReference: iconsReferenceData = {
	BiCoinStack: BiCoinStack,
	BsFillQuestionDiamondFill: BsFillQuestionDiamondFill,
	GiSwitchWeapon: GiSwitchWeapon,
	GiDropWeapon: GiDropWeapon,
};

export interface iconsReferenceData {
	[key: string]: any;
}
