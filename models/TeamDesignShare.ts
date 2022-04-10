import type { Design } from "./Design";
import type { Model } from "./Model";
import type { Permission } from "./Permission";
import type { Team } from "./Team";

export interface TeamDesignShare extends Model {
  permission?: Permission;
  team?: Team;
  design?: Design;
}
