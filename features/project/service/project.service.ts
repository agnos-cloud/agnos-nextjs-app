import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Project, ProjectInput, ProjectUpdate } from "@models/project";
import { ApiService } from "@services/base";
import { Query } from "@types";
import { getQueryString } from "@utils/url";

export default class ProjectService extends ApiService<Project, ProjectInput, ProjectUpdate> {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (input: ProjectInput) => Promise<Project> = async (input: ProjectInput) => {
    return axios({
      method: "POST",
      url: `${this.apiUrl}/projects`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: input,
    })
      .then((response) => {
        return response.data.data as Project;
      })
      .catch((error) => {
        throw error;
      });
  };

  get: (id?: string, query?: Query) => Promise<Project> = async (id?: string, query?: Query) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/projects${id ? `/${id}` : ""}${query ? `?${getQueryString(query)}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Project;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMany: (query?: Query) => Promise<Project[]> = async (query?: Query) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/projects${query ? `?${getQueryString(query)}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Project[];
      })
      .catch((error) => {
        throw error;
      });
  };

  update: (_: string | undefined, update: ProjectUpdate) => Promise<Project> = async (
    _: string | undefined,
    _update: ProjectUpdate
  ) => {
    throw new Error("Method not implemented.");
  };
}
