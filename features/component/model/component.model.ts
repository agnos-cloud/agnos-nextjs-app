import type { Model } from "@models/base";
import type { User } from "@models/user";
import { Org } from "@models/org";
import { Collaboration } from "@models/collaboration";
import { Form } from "@models/form";
import { PermissionScope } from "@constants/permissions";
import { Publication } from "@models/publication";

export interface Component extends Omit<ComponentInput, "org">, Model {
  collaborations?: Array<string> | Array<Collaboration>;
  org: string | Org | null;
  personal?: boolean;
  publications?: Array<string> | Array<Publication>;
  user: string | User | null;
}

export interface ComponentUpdate extends Omit<ComponentInput, "name" | "org"> {
  name?: string;
}

const keys = Object.keys(PermissionScope);

export interface ComponentInput {
  name: string;
  description?: string;
  form?: Form;
  onEnvChanged?: string;
  onEnvDeployed?: string;
  onInit?: string;
  onModelChanged?: string;
  org: string;
  private?: boolean;
  picture?: string;
  scopes?: typeof keys;
  supportedEnvLocations?: Array<string>;
  tags?: Array<string>;
  version: string;
}
