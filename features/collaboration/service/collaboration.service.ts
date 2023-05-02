import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import { omit } from "lodash";
import { ApiService } from "@services/base";
import { Query } from "@types";
import { getQueryString } from "@utils/url";
import type { Collaboration, CollaborationInput, CollaborationUpdate } from "@models/collaboration";

export default class CollaborationService extends ApiService<Collaboration, CollaborationInput, CollaborationUpdate> {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (input: CollaborationInput) => Promise<Collaboration> = async (input: CollaborationInput) => {
    // TODO: this is actually for ProjectCollaborationService.create
    return axios({
      method: "POST",
      url: `${this.apiUrl}/projects/${input.project}/collaborations`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: omit(input, "project"),
    })
      .then((response) => {
        return response.data.data as Collaboration;
      })
      .catch((error) => {
        throw error;
      });
  };

  get: (id?: string, query?: Query) => Promise<Collaboration> = async (id?: string, query?: Query) => {
    // TODO: this is actually for ProjectCollaborationService.get
    return axios({
      method: "GET",
      url: `${this.apiUrl}/projects/${query?.project}/collaborations${id ? `/${id}` : ""}${
        query ? `?${getQueryString(query)}` : ""
      }`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Collaboration;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMany: (query?: Query) => Promise<Collaboration[]> = async (query?: Query) => {
    // TODO: this is actually for ProjectCollaborationService.getMany
    // return axios({
    //   method: "GET",
    //   url: `${this.apiUrl}/projects/${query?.project}/collaborations${query ? `?${getQueryString(query)}` : ""}`,
    //   headers: { authorization: `Bearer ${this.accessToken}` },
    // })
    //   .then((response) => {
    //     return response.data.data as Collaboration[];
    //   })
    //   .catch((error) => {
    //     throw error;
    //   });

    return axios({
      method: "GET",
      url: `${this.apiUrl}/collaborations${query ? `?${getQueryString(query)}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Collaboration[];
      })
      .catch((error) => {
        throw error;
      });
  };

  update: (_: string | undefined, update: CollaborationUpdate) => Promise<Collaboration> = async (
    _: string | undefined,
    _update: CollaborationUpdate
  ) => {
    throw new Error("Method not implemented.");
  };
}
