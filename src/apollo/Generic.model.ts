import { characterTableData } from './Characters.model';
import { accountTableData } from './Tables.model';

export interface sendMoneyInput {
	character: number;
	money: number;
}

export interface getParsListInput {
	characterId: number;
}

export interface getDamageListByPartInput {
	characterId: number;
	partId: number;
}

export interface getMeData {
	character?: characterTableData;
	account?: accountTableData;
}
