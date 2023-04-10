import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Plugin, PluginInput } from "../models/Plugin";
import { ApiService } from "@services/base";

export default class PluginService extends ApiService {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (plugin: PluginInput) => Promise<Plugin> = async (plugin: PluginInput) => {
    return axios({
      method: "POST",
      url: `${this.apiUrl}/plugins`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: plugin,
    })
      .then((response) => {
        return response.data["plugin"] as Plugin;
      })
      .catch((error) => {
        throw error;
      });
  };

  get: (id: string) => Promise<Plugin> = async (id: string) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/plugins/${id}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["plugin"] as Plugin;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMyPlugins: (teamId: string | undefined) => Promise<Plugin[]> = async (teamId: string | undefined) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/me/plugins${teamId ? `?team=${teamId}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["plugins"] as Plugin[];
      })
      .catch((error) => {
        throw error;
      });
  };
}
