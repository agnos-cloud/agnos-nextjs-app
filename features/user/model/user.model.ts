import type { Membership } from "@models/membership";
import type { Model } from "@models/base";
import type { Settings } from "@models/settings";
import { Collaboration } from "@models/collaboration";

export interface User extends Model {
  name: string;
  collaborations?: Array<string> | Array<Collaboration>;
  email: string;
  emailIsVerified?: boolean;
  memberships?: Array<string> | Array<Membership>;
  picture?: string;
  settings?: string | Settings;
}
