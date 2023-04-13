import { PermissionScope } from "../constants/permissions";
import type { Model } from "@models/base";
import type { Team } from "./Team";
import type { User } from "@models/user";

export interface Function extends Omit<FunctionInput, "team">, Model {
  team?: Team;
  user?: User;
  versions?: Array<FunctionVersion>;
}

export interface FunctionInput {
  name: string;
  description?: string;
  picture?: string;
  private?: boolean;
  secrets?: object;
  team?: string;
}

export interface FunctionVersion extends Omit<FunctionVersionInput, "function">, Model {
  function?: Function;
  team?: Team;
  user?: User;
}

export interface FunctionVersionUpdate extends Omit<FunctionVersionInput, "name" | "code" | "function" | "published"> {
  name?: string;
  code?: string;
  published?: boolean;
}

const keys = Object.keys(PermissionScope);

export interface FunctionVersionInput {
  name: string;
  code: string;
  description?: string;
  function: string;
  published: boolean;
  scopes?: typeof keys;
  secrets?: object;
  testData?: string;
}
