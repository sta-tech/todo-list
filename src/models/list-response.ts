interface ListResponse<T> {
  items: T[];
  total: number;
}

export default ListResponse;