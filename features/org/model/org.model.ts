import type { Model } from "@models/base";
import { Collaboration } from "@models/collaboration";
import { Membership } from "@models/membership";
import { Project } from "@models/project";
import type { User } from "@models/user";

export interface Org extends OrgInput, Model {
  collaborations?: Array<string> | Array<Collaboration>;
  emailIsVerified?: boolean;
  memberships?: Array<string> | Array<Membership>;
  personal?: boolean;
  projects?: Array<string> | Array<Project>;
  user: string | User | null;
}

export interface OrgUpdate extends Omit<OrgInput, "name"> {
  name?: string;
}

export interface OrgInput {
  name: string;
  description?: string;
  email?: string;
  private?: boolean;
  picture?: string;
  secrets?: object;
}
