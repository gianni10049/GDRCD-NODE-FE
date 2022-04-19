import { abilityTableData } from '../../../apollo/Tables.model';

export interface AbiButtonsData {
	tooltip: string;
	points: number;
	icon: any;
	max_level: number;
}

export interface AbiChartData {
	abilities: abilityTableData[];
}
