import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import { omit } from "lodash";
import { ApiService } from "@services/base";
import { Query } from "@types";
import { getQueryString } from "@utils/url";
import { Membership, MembershipInput, MembershipUpdate } from "@models/membership";

export default class MembershipService extends ApiService<Membership, MembershipInput, MembershipUpdate> {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (input: MembershipInput) => Promise<Membership> = async (input: MembershipInput) => {
    // TODO: this is actually for OrgMembershipService.create
    return axios({
      method: "POST",
      url: `${this.apiUrl}/orgs/${input.org}/memberships`,
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: omit(input, "project"),
    })
      .then((response) => {
        return response.data.data as Membership;
      })
      .catch((error) => {
        throw error;
      });
  };

  get: (id?: string, query?: Query) => Promise<Membership> = async (id?: string, query?: Query) => {
    // TODO: this is actually for OrgMembershipService.get
    return axios({
      method: "GET",
      url: `${this.apiUrl}/orgs/${query?.org}/memberships${id ? `/${id}` : ""}${
        query ? `?${getQueryString(query)}` : ""
      }`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Membership;
      })
      .catch((error) => {
        throw error;
      });
  };

  getMany: (query?: Query) => Promise<Membership[]> = async (query?: Query) => {
    // TODO: this is actually for OrgMembershipService.getMany
    return axios({
      method: "GET",
      url: `${this.apiUrl}/orgs/${query?.org}/memberships${query ? `?${getQueryString(query)}` : ""}`,
      headers: { authorization: `Bearer ${this.accessToken}` },
    })
      .then((response) => {
        return response.data.data as Membership[];
      })
      .catch((error) => {
        throw error;
      });
  };

  update: (_: string | undefined, update: MembershipUpdate) => Promise<Membership> = async (
    _: string | undefined,
    _update: MembershipUpdate
  ) => {
    throw new Error("Method not implemented.");
  };
}
