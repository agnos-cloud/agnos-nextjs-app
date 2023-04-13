import type { Model } from "@models/base";
import type { Team } from "./Team";
import type { TeamDesignShare } from "./TeamDesignShare";
import type { User } from "@models/user";
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
