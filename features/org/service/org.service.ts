import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Org } from "@models/org";
import { ApiService } from "@services/base";

export default class OrgService extends ApiService {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  get: (id: string) => Promise<Org> = async (id: string) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/orgs/${id}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Org;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMyOrg: () => Promise<Org> = async () => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/me/org`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Org;
      })
      .catch((error) => {
        throw error;
      });
  };
}
