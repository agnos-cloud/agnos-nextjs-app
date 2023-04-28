import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import { omit } from "lodash";
import { ApiService } from "@services/base";
import { Query } from "@types";
import { getQueryString } from "@utils/url";
import type { Model, ModelInput, ModelUpdate } from "@models/model";

export default class ModelService extends ApiService<Model, ModelInput, ModelUpdate> {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (input: ModelInput) => Promise<Model> = async (input: ModelInput) => {
    return axios({
      method: "POST",
      url: `${this.apiUrl}/projects/${input.project}/models`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: omit(input, "project"),
    })
      .then((response) => {
        return response.data.data as Model;
      })
      .catch((error) => {
        throw error;
      });
  };

  get: (id?: string, query?: Query) => Promise<Model> = async (id?: string, query?: Query) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/projects/${query?.project}/models${id ? `/${id}` : ""}${
        query ? `?${getQueryString(query)}` : ""
      }`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Model;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMany: (query?: Query) => Promise<Model[]> = async (query?: Query) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/projects/${query?.project}/models${query ? `?${getQueryString(query)}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Model[];
      })
      .catch((error) => {
        throw error;
      });
  };
}
