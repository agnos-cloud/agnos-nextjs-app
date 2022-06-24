import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Function, FunctionInput } from "../models/Function";
import ApiService from "./ApiService";

export default class FunctionService extends ApiService {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (func: FunctionInput) => Promise<Function> = async (func: FunctionInput) => {
    return axios({
      method: "POST",
      url: `${this.apiUrl}/functions`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: func,
    })
      .then((response) => {
        return response.data["function"] as Function;
      })
      .catch((error) => {
        throw error;
      });
  };

  get: (id: string) => Promise<Function> = async (id: string) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/functions/${id}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["function"] as Function;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMyFunctions: (teamId: string | undefined) => Promise<Function[]> = async (teamId: string | undefined) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/me/functions${teamId ? `?team=${teamId}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["functions"] as Function[];
      })
      .catch((error) => {
        throw error;
      });
  };
}
