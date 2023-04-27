export interface Permission {
  _id: PermissionName;
  name: PermissionName;
  description?: string;
  value: number;
}

export type PermissionName = "read" | "write" | "admin";

export type RoleName = "guest" | "member" | "owner";
