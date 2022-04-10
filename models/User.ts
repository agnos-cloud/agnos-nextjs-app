import type { Membership } from "./Membership";
import type { Model } from "./Model";
import type { UserDesignShare } from "./UserDesignShare";

export interface User extends Model {
  name: string;
  email: string;
  emailIsVerified?: boolean;
  memberships: Array<Membership>;
  picture?: string;
  userDesignShares?: Array<UserDesignShare>;
}
