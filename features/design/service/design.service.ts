import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import { omit } from "lodash";
import { ApiService } from "@services/base";
import { Query } from "@types";
import { getQueryString } from "@utils/url";
import type { Design, DesignInput, DesignUpdate } from "@models/design";

export default class DesignService extends ApiService<Design, DesignInput, DesignUpdate> {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (input: DesignInput) => Promise<Design> = async (input: DesignInput) => {
    return axios({
      method: "POST",
      url: `${this.apiUrl}/projects/${input.project}/designs`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: omit(input, "project"),
    })
      .then((response) => {
        return response.data.data as Design;
      })
      .catch((error) => {
        throw error;
      });
  };

  get: (id?: string, query?: Query) => Promise<Design> = async (id?: string, query?: Query) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/projects/${query?.project}/designs${id ? `/${id}` : ""}${
        query ? `?${getQueryString(query)}` : ""
      }`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Design;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMany: (query?: Query) => Promise<Design[]> = async (query?: Query) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/projects/${query?.project}/designs${query ? `?${getQueryString(query)}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Design[];
      })
      .catch((error) => {
        throw error;
      });
  };

  update: (_: string | undefined, update: DesignUpdate) => Promise<Design> = async (
    _: string | undefined,
    _update: DesignUpdate
  ) => {
    throw new Error("Method not implemented.");
  };
}
