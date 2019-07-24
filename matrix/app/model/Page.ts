export default interface Page<T> {
  page?: number;
  pageSize?: number;
  total: number;
  list: Array<T>;
}
