import type { Model } from "@models/base";
import type { Permission } from "./Permission";
import type { Team } from "./Team";
import type { User } from "./User";

export interface Membership extends Model {
  permission?: Permission;
  team?: Team;
  user?: User;
}
