import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Org, OrgInput, OrgUpdate } from "@models/org";
import { ApiService } from "@services/base";

export default class OrgService extends ApiService<Org, OrgInput, OrgUpdate> {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (input: OrgInput) => Promise<Org> = async (_: OrgInput) => {
    throw new Error("Method not implemented.");
  };

  get: (id?: string) => Promise<Org> = async (id?: string) => {
    return axios({
      method: "GET",
      url: id ? `${this.apiUrl}/orgs/${id}` : `${this.apiUrl}/me/org`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Org;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMany: () => Promise<Org[]> = async () => {
    throw new Error("Method not implemented.");
  };
}
