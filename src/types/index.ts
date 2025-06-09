export interface MemberAttributes {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleAttributes {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberRoleAttributes {
  memberId: string;
  roleId: string;
}