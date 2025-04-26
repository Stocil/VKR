export type Nullable<T> = T | null | undefined;

export type DefaultServerError = {
  status: number;
  data?: {
    error?: string;
  };
};
