import locale from 'antd/es/calendar/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import { MonthEnum } from './constants/months.enum';
import { WeekDayEnum } from './constants/weekdays.enum';

moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
});

moment.locale('ru');

export const calendarLocale = {
    lang: {
        ...locale.lang,
        shortWeekDays: [
            WeekDayEnum.SUNDAY,
            WeekDayEnum.MONDAY,
            WeekDayEnum.TUESDAY,
            WeekDayEnum.WEDNESDAY,
            WeekDayEnum.THURSDAY,
            WeekDayEnum.FRIDAY,
            WeekDayEnum.SATURDAY,
        ],
        shortMonths: [
            MonthEnum.JANUARY,
            MonthEnum.FEBRUARY,
            MonthEnum.MARCH,
            MonthEnum.APRIL,
            MonthEnum.MAY,
            MonthEnum.JUNE,
            MonthEnum.JULY,
            MonthEnum.AUGUST,
            MonthEnum.SEPTEMBER,
            MonthEnum.OCTOBER,
            MonthEnum.NOVEMBER,
            MonthEnum.DECEMBER,
        ],
    },
    timePickerLocale: {
        ...locale.timePickerLocale,
    },
};
