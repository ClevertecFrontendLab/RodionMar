import locale from 'antd/es/calendar/locale/ru_RU';

import moment from 'moment';
import 'moment/locale/ru';

moment.updateLocale('ru', {
    week: {
        dow: 1,
    },
});

moment.locale('ru');

export const calendarLocale = {
    lang: {
        ...locale.lang,
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Март',
            'Апр',
            'Май',
            'Июнь',
            'Июль',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
    },
    timePickerLocale: {
        ...locale.timePickerLocale,
    },
};
