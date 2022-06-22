import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Invocation } from "../models/Invocation";
import ApiService from "./ApiService";

export default class InvocationService extends ApiService {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  getMany: (source: string | undefined) => Promise<Invocation[]> = async (func: string | undefined) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/invocations${func ? `?function=${func}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["invocations"] as Invocation[];
      })
      .catch((error) => {
        throw error;
      });
  };
}
