import CharacterProfile from '../components/Character/Profile/character_profile';
import Page404 from '../components/404/404';
import { AbilityDetails } from '../components/Ability/AbilityDetails';
import { DamageDetails } from '../components/Damage/DamageDetails';

const modalsContent: modalsContentData = {
	Profile: CharacterProfile,
	Page404: Page404,
	AbilityDetails: AbilityDetails,
	DamageDetails: DamageDetails,
};

interface modalsContentData {
	[key: string]: any;
}

export default modalsContent;
