export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: Role[];
  userName: string;
}

export enum Role {
  admin = 'admin',
  user = 'user',
}
