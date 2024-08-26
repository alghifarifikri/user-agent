export interface User {
  id?: number | string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  image?: string;
}

export interface TableProps {
  dataSource: Array<User>;
  column: Array<string>;
  mapping: Array<string>;
  handleEdit: (param: any) => void;
  handleModalDelete: (param: any) => void;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  success: boolean | null;
}
