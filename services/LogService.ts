import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Log } from "../models/Log";
import { ApiService } from "@services/base";

export default class LogService extends ApiService {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  getMany: (source: string | undefined) => Promise<Log[]> = async (source: string | undefined) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/logs${source ? `?source=${source}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["logs"] as Log[];
      })
      .catch((error) => {
        throw error;
      });
  };
}
