import { TTarifListPeriod } from './tarif-list-period.type';

export type TTariffListResponse = {
    _id: string;
    name: string;
    periods: TTarifListPeriod[];
};
