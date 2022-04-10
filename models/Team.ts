import type { Membership } from "./Membership";
import type { Model } from "./Model";
import type { TeamDesignShare } from "./TeamDesignShare";
import type { User } from "./User";

export interface Team extends Model {
  name: string;
  autoCreated?: boolean;
  description?: string;
  email?: string;
  memberships?: Array<Membership>;
  private?: boolean;
  picture?: string;
  secrets?: object;
  user?: User;
  teamDesignShares?: Array<TeamDesignShare>;
}
