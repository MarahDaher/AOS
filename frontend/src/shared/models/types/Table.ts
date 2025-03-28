export type Column<T> = {
  label: string;
  render: (row: T) => React.ReactNode;
};

export type Props<T> = {
  data: T[];
  columns: Column<T>[];
  rowsPerPageOptions?: number[];
  actions?: (row: T) => React.ReactNode;
  searchableField?: keyof T;
  loading?: boolean;
};
