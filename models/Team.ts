import type { Design } from "./Design";
import type { Membership } from "./Membership";
import type { Model } from "@models/base";
import type { Plugin } from "./Plugin";
import type { TeamDesignShare } from "./TeamDesignShare";
import type { User } from "./User";

export interface Team extends TeamInput, Model {
  autoCreated?: boolean;
  designs?: Array<Design>;
  memberships?: Array<Membership>;
  plugins?: Array<Plugin>;
  user?: User;
  teamDesignShares?: Array<TeamDesignShare>;
}

export interface TeamInput {
  name: string;
  description?: string;
  email?: string;
  picture?: string;
  private?: boolean;
  secrets?: object;
}
