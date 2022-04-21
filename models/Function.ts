import type { PermissionScope } from "../constants/permissions";
import type { Model } from "./Model";
import type { Team } from "./Team";
import type { User } from "./User";

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

export interface FunctionVersion
  extends Omit<FunctionVersionInput, "function">,
    Model {
  function?: Function;
  team?: Team;
  user?: User;
}

export interface FunctionVersionUpdate
  extends Omit<
    FunctionVersionInput,
    "name" | "code" | "function" | "published"
  > {
  name?: string;
  code?: string;
  published?: boolean;
}

export interface FunctionVersionInput {
  name: string;
  code: string;
  description?: string;
  function: string;
  published: boolean;
  scopes?: Array<PermissionScope>;
  secrets?: object;
  testData?: string;
}
