import type { Model } from "@models/base";
import type { Team } from "../../../models/Team";
import type { User } from "@models/user";
import { Org } from "@models/org";
import { RoleName } from "@constants/permissions";

export interface Membership extends Omit<MembershipInput, "org" | "team" | "user">, Model {
  org: string | Org | null;
  team?: string | Team | null;
  user: string | User | null;
}

export interface MembershipUpdate extends Omit<MembershipInput, "org" | "team" | "user"> {
  role?: RoleName;
}

export interface MembershipInput {
  org: string;
  role?: RoleName;
  team?: string;
  user: string;
}
