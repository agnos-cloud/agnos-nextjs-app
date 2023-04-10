import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Membership } from "../models/Membership";
import { ApiService } from "@services/base";

export default class MembershipService extends ApiService {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  getMyMemberships: () => Promise<Membership[]> = async () => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/me/memberships`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["memberships"] as Membership[];
      })
      .catch((error) => {
        throw error;
      });
  };
}
