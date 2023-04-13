export interface Permission {
  _id: PermissionName;
  name: PermissionName;
  description?: string;
  value: number;
}

export type PermissionName = "READ" | "WRITE" | "ADMIN";

export type RoleName = "GUEST" | "MEMBER" | "OWNER";
