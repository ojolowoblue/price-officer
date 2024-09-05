export interface DispatchAction<T> {
  type: string;
  payload?: T;
}
