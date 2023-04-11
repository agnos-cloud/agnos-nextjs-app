import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Settings, SettingsInput } from "@models/settings";
import { ApiService } from "@services/base";

export default class SettingsService extends ApiService {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

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

  update: (settings: SettingsInput) => Promise<Settings> = async (settings: SettingsInput) => {
    return axios({
      method: "PATCH",
      url: `${this.apiUrl}/settings`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: settings,
    })
      .then((response) => {
        return response.data.data as Settings;
      })
      .catch((error) => {
        throw error;
      });
  };
}
