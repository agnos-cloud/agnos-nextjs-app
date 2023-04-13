import type { Model } from "@models/base";
import type { User } from "../../../models/User";

export interface Org extends OrgInput, Model {
  // collaborations?: Array<OrgCollaboration>;
  emailIsVerified?: boolean;
  personal?: boolean;
  user?: User;
}

export interface OrgInput {
  name: string;
  description?: string;
  email?: string;
  private?: boolean;
  picture?: string;
  secrets?: object;
}
