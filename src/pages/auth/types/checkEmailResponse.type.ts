export type TCheckEmailResponse = {
  meta: {
      requestStatus: string;
  };
  payload: {
    email: string;
    status: number;
    message: string;
  }
};
