import { abilityTableData } from '../../../apollo/Tables.model';

export interface AbiButtonsData {
	abilityId: number;
	characterId: number;
	tooltip: string;
	points: number;
	icon: any;
	max_level: number;
}

export interface AbiChartData {
	abilities: abilityTableData[];
	characterId: number;
}
