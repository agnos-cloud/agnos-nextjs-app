import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { Team, TeamInput } from "../models/Team";
import { ApiService } from "@services/base";

export default class TeamService extends ApiService {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (team: TeamInput) => Promise<Team> = async (team: TeamInput) => {
    return axios({
      method: "POST",
      url: `${this.apiUrl}/teams`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: team,
    })
      .then((response) => {
        return response.data["team"] as Team;
      })
      .catch((error) => {
        throw error;
      });
  };

  get: (id: string) => Promise<Team> = async (id: string) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/teams/${id}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["team"] as Team;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMyTeam: () => Promise<Team> = async () => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/me/team`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["team"] as Team;
      })
      .catch((error) => {
        throw error;
      });
  };
}
