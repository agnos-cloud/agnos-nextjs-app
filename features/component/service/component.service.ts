import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Component, ComponentInput, ComponentUpdate } from "@models/component";
import { ApiService } from "@services/base";
import { Query } from "@types";
import { getQueryString } from "@utils/url";

export default class ComponentService extends ApiService<Component, ComponentInput, ComponentUpdate> {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (input: ComponentInput) => Promise<Component> = async (input: ComponentInput) => {
    return axios({
      method: "POST",
      url: `${this.apiUrl}/components`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: input,
    })
      .then((response) => {
        return response.data.data as Component;
      })
      .catch((error) => {
        throw error;
      });
  };

  get: (id?: string, query?: Query) => Promise<Component> = async (id?: string, query?: Query) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/components${id ? `/${id}` : ""}${query ? `?${getQueryString(query)}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Component;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMany: (query?: Query) => Promise<Component[]> = async (query?: Query) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/components${query ? `?${getQueryString(query)}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Component[];
      })
      .catch((error) => {
        throw error;
      });
  };

  update: (_: string | undefined, update: ComponentUpdate) => Promise<Component> = async (
    _: string | undefined,
    _update: ComponentUpdate
  ) => {
    throw new Error("Method not implemented.");
  };
}
