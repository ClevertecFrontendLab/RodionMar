import { TarifListPeriod } from './tarif-list-period.type';

export type TariffListResponse = {
    _id: string;
    name: string;
    periods: TarifListPeriod[];
};
