type TActionCard = {
    title: string;
    buttonText: string;
    buttonIcon: 'heart' | 'calendar' | 'profile';
};

export const cards: TActionCard[] = [
    { title: 'Расписать тренировки', buttonText: 'Тренировки', buttonIcon: 'heart' },
    { title: 'Назначить календарь', buttonText: 'Календарь', buttonIcon: 'calendar' },
    { title: 'Заполнить профиль', buttonText: 'Профиль', buttonIcon: 'profile' },
];
