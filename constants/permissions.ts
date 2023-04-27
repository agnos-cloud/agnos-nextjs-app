export enum PermissionName {
  "read" = "READ",
  "write" = "WRITE",
  "admin" = "ADMIN",
}

export enum PermissionScope {
  "read:design" = "read:design",
  "read:environment" = "read:environment",
  "read:org" = "read:org",
  "read:project" = "read:project",
  "read:user" = "read:user",
}

export enum RoleName {
  "guest" = "guest",
  "member" = "member",
  "owner" = "owner",
}
