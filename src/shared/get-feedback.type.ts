export type TGetFeedback = {
  fullName: null | string;
  imageSrc: null | string;
  message: null | string;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  id?: string
}