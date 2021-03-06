import type { Model } from "./Model";
import type { Team } from "./Team";
import type { TeamDesignShare } from "./TeamDesignShare";
import type { User } from "./User";
import type { UserDesignShare } from "./UserDesignShare";

export interface Design extends Omit<DesignInput, "team">, Model {
  flow?: object;
  picture?: string;
  secrets?: object;
  team?: Team;
  teamDesignShares?: Array<TeamDesignShare>;
  user?: User;
  userDesignShares?: Array<UserDesignShare>;
}

export interface DesignInput {
  name: string;
  description?: string;
  private?: boolean;
  team?: string;
}
