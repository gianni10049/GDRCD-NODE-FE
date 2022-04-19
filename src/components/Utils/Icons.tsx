import { getIconsData } from './Icons.model';
import { iconsReference } from '../../constants/icons';

export const getIcons = (props: getIconsData) => {
	let { icon } = props;

	let iconsList = iconsReference;

	return iconsList[icon] ?? iconsList['BsFillQuestionDiamondFill'];
};
