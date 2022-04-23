import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type {
  FunctionVersion,
  FunctionVersionInput,
  FunctionVersionUpdate,
} from "../models/Function";
import ApiService from "./ApiService";

export default class FunctionVersionService extends ApiService {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (functionVersion: FunctionVersionInput) => Promise<FunctionVersion> =
    async (functionVersion: FunctionVersionInput) => {
      return axios({
        method: "POST",
        url: `${this.apiUrl}/function-versions`,
        headers: { authorization: `Bearer ${this.accessToken}` },
        data: functionVersion,
      })
        .then((response) => {
          return response.data["functionVersion"] as FunctionVersion;
        })
        .catch((error) => {
          throw error;
        });
    };

  get: (id: string) => Promise<FunctionVersion> = async (id: string) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/function-versions/${id}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["functionVersion"] as FunctionVersion;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMany: (functionId: string | undefined) => Promise<FunctionVersion[]> =
    async (functionId: string | undefined) => {
      return axios({
        method: "GET",
        url: `${this.apiUrl}/function-versions${
          functionId ? `?function=${functionId}` : ""
        }`,
        headers: { authorization: `Bearer ${this.accessToken}` },
      })
        .then((response) => {
          return response.data["functionVersions"] as FunctionVersion[];
        })
        .catch((error) => {
          throw error;
        });
    };

  update: (
    id: string,
    functionVersion: FunctionVersionUpdate
  ) => Promise<FunctionVersion> = async (
    id: string,
    functionVersion: FunctionVersionUpdate
  ) => {
    return axios({
      method: "PATCH",
      url: `${this.apiUrl}/function-versions/${id}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: functionVersion,
    })
      .then((response) => {
        return response.data["functionVersion"] as FunctionVersion;
      })
      .catch((error) => {
        throw error;
      });
  };

  run: (
    id: string,
    data: { form?: Record<string, any> },
    options: { test?: boolean }
  ) => Promise<unknown> = async (
    id: string,
    data: { form?: Record<string, any> },
    options?: { test?: boolean }
  ) => {
    return axios({
      method: "POST",
      url: `${this.apiUrl}/function-versions/${id}${
        options?.test ? "?test=true" : ""
      }`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data,
    })
      .then((response) => {
        return response.data["result"];
      })
      .catch((error) => {
        throw error;
      });
  };
}
