import { PermissionName } from "@constants/permissions";
import type { Model } from "@models/base";
import { Component } from "@models/component";
import { Org } from "@models/org";
import { Project } from "@models/project";
import type { User } from "@models/user";
import { Team } from "models/Team";

export interface Collaboration
  extends Omit<CollaborationInput, "component" | "org" | "project" | "team" | "user">,
    Model {
  component?: string | Component | null;
  org: string | Org | null;
  project?: string | Project | null;
  team?: string | Team | null;
  user?: string | User | null;
}

export interface CollaborationUpdate extends Omit<CollaborationInput, "org" | "project" | "team" | "user"> {
  permission?: PermissionName;
}

export interface CollaborationInput {
  component?: string;
  org: string;
  permission?: PermissionName;
  project?: string;
  team?: string;
  user?: string;
}
