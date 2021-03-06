import type { Design } from "./Design";
import type { Model } from "./Model";
import type { Permission } from "./Permission";
import type { User } from "./User";

export interface UserDesignShare extends Model {
  permission?: Permission;
  user?: User;
  design?: Design;
}
