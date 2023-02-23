export interface ColumnTable {
  column_name: string;
  label: string;
  mode?: 'text' | 'switcher';
  label_on?: string;
  label_off?: string;
}

export interface Reader<T> {
  getAll(): Promise<T[]>;
  find(item: Partial<T>): Promise<T[]>;
  findFirst(item: Partial<T>): Promise<T>;
  findById(id: string | Partial<T>): Promise<T>;
  getColumns(tableName: string): Promise<ColumnTable[]>;
}