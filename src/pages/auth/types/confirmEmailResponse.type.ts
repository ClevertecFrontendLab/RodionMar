export type TConfirmEmailResponse = {
  meta: {
      requestStatus: string;
  };
  payload: {
      email: string;
  }
};