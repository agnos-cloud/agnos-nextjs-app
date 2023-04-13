import { PermissionName } from "@constants/permissions";
import type { Model } from "@models/base";
import { Org } from "@models/org";
import { Project } from "@models/project";
import type { User } from "@models/user";
import { Team } from "models/Team";

export interface Collaboration extends Omit<CollaborationInput, "org" | "project" | "team" | "user">, Model {
  org: string | Org;
  project: string | Project;
  team?: string | Team;
  user?: string | User;
}

export interface CollaborationUpdate extends Omit<CollaborationInput, "org" | "project" | "team" | "user"> {
  permission?: PermissionName;
}

export interface CollaborationInput {
  org: string;
  permission?: PermissionName;
  project: string;
  team?: string;
  user?: string;
}
