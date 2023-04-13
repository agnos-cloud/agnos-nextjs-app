import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { PluginVersion, PluginVersionInput, PluginVersionUpdate } from "../models/Plugin";
import { ApiService } from "@services/base";

export default class PluginVersionService extends ApiService {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (pluginVersion: PluginVersionInput) => Promise<PluginVersion> = async (pluginVersion: PluginVersionInput) => {
    return axios({
      method: "POST",
      url: `${this.apiUrl}/plugin-versions`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: pluginVersion,
    })
      .then((response) => {
        return response.data["pluginVersion"] as PluginVersion;
      })
      .catch((error) => {
        throw error;
      });
  };

  get: (id: string) => Promise<PluginVersion> = async (id: string) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/plugin-versions/${id}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["pluginVersion"] as PluginVersion;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMany: (pluginId: string | undefined) => Promise<PluginVersion[]> = async (pluginId: string | undefined) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/plugin-versions${pluginId ? `?plugin=${pluginId}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["pluginVersions"] as PluginVersion[];
      })
      .catch((error) => {
        throw error;
      });
  };

  update: (id: string, pluginVersion: PluginVersionUpdate) => Promise<PluginVersion> = async (
    id: string,
    pluginVersion: PluginVersionUpdate
  ) => {
    return axios({
      method: "PATCH",
      url: `${this.apiUrl}/plugin-versions/${id}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: pluginVersion,
    })
      .then((response) => {
        return response.data["pluginVersion"] as PluginVersion;
      })
      .catch((error) => {
        throw error;
      });
  };
}
