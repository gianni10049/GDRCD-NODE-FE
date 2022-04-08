import CharacterProfile from '../components/Character/character_profile';
import Page404 from '../components/404/404';

const modalsContent: modalsContentData = {
	Profile: CharacterProfile,
	Page404: Page404,
};

interface modalsContentData {
	[key: string]: any;
}

export default modalsContent;
