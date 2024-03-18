export type TActionCard = {
    title: string;
    buttonText: string;
    buttonIcon: 'heart' | 'calendar' | 'profile';
    handleRedirect?: () => Promise<void>;
    dataTestId?: string;
};