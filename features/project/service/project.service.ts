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

  create: (project: ProjectInput) => Promise<Project> = async (project: ProjectInput) => {
    return axios({
      method: "POST",
      url: `${this.apiUrl}/projects`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: project,
    })
      .then((response) => {
        return response.data.data as Project;
      })
      .catch((error) => {
        throw error;
      });
  };

  get: (id?: string) => Promise<Project> = async (id?: string) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/projects${id ? `/${id}` : ""}`,
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
}
