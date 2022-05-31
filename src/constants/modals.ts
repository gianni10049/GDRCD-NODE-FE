import CharacterProfile from '../components/Character/Profile/character_profile';
import Page404 from '../components/404/404';
import { AbilityDetails } from '../components/Ability/AbilityDetails';
import { DamageDetails } from '../components/Damage/DamageDetails';
import { Bank } from '../components/Services/bank';
import { Messages } from '../components/Messages/Messages';
import { Radio } from '../components/Messages/Radio';

const modalsContent: modalsContentData = {
	Profile: CharacterProfile,
	Page404: Page404,
	AbilityDetails: AbilityDetails,
	DamageDetails: DamageDetails,
	Bank: Bank,
	Messages: Messages,
	Radio: Radio,
};

interface modalsContentData {
	[key: string]: any;
}

export default modalsContent;
