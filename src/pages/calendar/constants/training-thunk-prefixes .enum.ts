const CALENDAR_PREFIX = 'calendar';

export enum TrainingThunkPrefix {
    FETCH_TRAININGS = `${CALENDAR_PREFIX}/fetchTrainings`,
    FETCH_TRAININGS_CATALOG = `${CALENDAR_PREFIX}/fetchTrainingsCatalog`,
    CREATE_TRAINING = `${CALENDAR_PREFIX}/createTraining`,
    UPDATE_TRAINING = `${CALENDAR_PREFIX}/updateTraining`,
    DELETE_TRAINING = `${CALENDAR_PREFIX}/deleteTraining`,
}