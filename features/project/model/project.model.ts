import type { Model } from "@models/base";
import type { User } from "@models/user";
import { Org } from "@models/org";
import { Collaboration } from "@models/collaboration";

export interface Project extends Omit<ProjectInput, "org">, Model {
  collaborations?: Array<string> | Array<Collaboration>;
  org: string | Org | null;
  personal?: boolean;
  user: string | User | null;
}

export interface ProjectUpdate extends Omit<ProjectInput, "name" | "org"> {
  name?: string;
}

export interface ProjectInput {
  name: string;
  description?: string;
  org: string;
  private?: boolean;
  picture?: string;
  secrets?: object;
}
