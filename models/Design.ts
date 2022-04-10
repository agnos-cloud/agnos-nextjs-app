import type { Model } from "./Model";
import type { Team } from "./Team";
import type { TeamDesignShare } from "./TeamDesignShare";
import type { User } from "./User";
import type { UserDesignShare } from "./UserDesignShare";

export interface Design extends Model {
  name: string;
  description?: string;
  flow?: object;
  private?: boolean;
  picture?: string;
  secrets?: object;
  team?: Team;
  teamDesignShares?: Array<TeamDesignShare>;
  user?: User;
  userDesignShares?: Array<UserDesignShare>;
}
