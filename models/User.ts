import type { Membership } from "./Membership";
import type { Model } from "@models/base";
import type { Settings } from "@models/settings";
import type { UserDesignShare } from "./UserDesignShare";

export interface User extends Model {
  name: string;
  email: string;
  emailIsVerified?: boolean;
  memberships: Array<Membership>;
  picture?: string;
  settings?: Settings;
  userDesignShares?: Array<UserDesignShare>;
}
