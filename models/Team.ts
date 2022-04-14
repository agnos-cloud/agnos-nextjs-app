import type { Design } from "./Design";
import type { Membership } from "./Membership";
import type { Model } from "./Model";
import type { Plugin } from "./Plugin";
import type { TeamDesignShare } from "./TeamDesignShare";
import type { User } from "./User";

export interface Team extends Model {
  name: string;
  autoCreated?: boolean;
  description?: string;
  designs?: Array<Design>;
  email?: string;
  memberships?: Array<Membership>;
  private?: boolean;
  picture?: string;
  plugins?: Array<Plugin>;
  secrets?: object;
  user?: User;
  teamDesignShares?: Array<TeamDesignShare>;
}
