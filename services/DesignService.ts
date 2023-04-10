import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Design, DesignInput } from "../models/Design";
import { ApiService } from "@services/base";

export default class DesignService extends ApiService {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (design: DesignInput) => Promise<Design> = async (design: DesignInput) => {
    return axios({
      method: "POST",
      url: `${this.apiUrl}/designs`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: design,
    })
      .then((response) => {
        return response.data["design"] as Design;
      })
      .catch((error) => {
        throw error;
      });
  };

  get: (id: string) => Promise<Design> = async (id: string) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/designs/${id}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["design"] as Design;
      })
      .catch((error) => {
        throw error;
      });
  };
}
