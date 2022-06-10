import { getIconsData } from './Icons.model';
import { iconsReference } from '../../constants/icons';

export const getIcon = (props: getIconsData) => {
	let { icon } = props;

	let iconsList = iconsReference;

	return iconsList[icon] ?? iconsList['BsFillQuestionDiamondFill'];
};

export const getImage = (image_path: string) => {
	try {
		return require('../../static/images/' + image_path);
	} catch (err) {
		return '';
	}
};
