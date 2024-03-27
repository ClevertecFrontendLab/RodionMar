import { ActionIcon } from "@constants/action-card.enum";

export type ActionCard = {
    title: string;
    buttonText: string;
    buttonIcon: ActionIcon.HEART | ActionIcon.CALENDAR | ActionIcon.PROFILE;
    handleRedirect?: (() => Promise<void>) | (() => void);
    dataTestId?: string;
};
