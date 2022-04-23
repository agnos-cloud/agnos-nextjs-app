import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import type { TeamDesignShare } from "../models/TeamDesignShare";
import ApiService from "./ApiService";

export default class TeamDesignShareService extends ApiService {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  getMyTeamDesignShares: (
    teamId: string | undefined
  ) => Promise<TeamDesignShare[]> = async (teamId: string | undefined) => {
    return axios({
      method: "GET",
      url: `${this.apiUrl}/me/team-designs${teamId ? `?team=${teamId}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data["teamDesignShares"] as TeamDesignShare[];
      })
      .catch((error) => {
        throw error;
      });
  };
}
