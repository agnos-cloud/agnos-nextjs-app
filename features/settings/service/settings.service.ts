import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Settings, SettingsInput } from "@models/settings";
import { ApiService } from "@services/base";

export default class SettingsService extends ApiService<Settings, SettingsInput, SettingsInput> {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (input: SettingsInput) => Promise<Settings> = async (_: SettingsInput) => {
    throw new Error("Method not implemented.");
  };

  get: () => Promise<Settings> = async () => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/settings`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Settings;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMany: () => Promise<Settings[]> = async () => {
    throw new Error("Method not implemented.");
  };

  update: (update: SettingsInput) => Promise<Settings> = async (update: SettingsInput) => {
    return axios({
      method: "PATCH",
      url: `${this.apiUrl}/settings`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: update,
    })
      .then((response) => {
        return response.data.data as Settings;
      })
      .catch((error) => {
        throw error;
      });
  };
}
