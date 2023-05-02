import type { UserProfile } from "@auth0/nextjs-auth0";
import axios from "axios";
import { ApiService } from "@services/base";
import { Canvas, CanvasInput, CanvasUpdate } from "@models/canvas";
import { omit } from "lodash";

export default class CanvasService extends ApiService<Canvas, CanvasInput, CanvasUpdate> {
  constructor(user: UserProfile | undefined) {
    super(user);
  }

  create: (input: CanvasInput) => Promise<Canvas> = async (_: CanvasInput) => {
    throw new Error("Method not implemented.");
  };

  get: () => Promise<Canvas> = async () => {
    throw new Error("Method not implemented.");
  };

  getMany: () => Promise<Canvas[]> = async () => {
    throw new Error("Method not implemented.");
  };

  update: (_: string | undefined, update: CanvasUpdate) => Promise<Canvas> = async (
    _: string | undefined,
    update: CanvasUpdate
  ) => {
    return axios({
      method: "PATCH",
      url: update.project ? `${this.apiUrl}/projects/${update.project}/canvas` : "// TODO",
      headers: { authorization: `Bearer ${this.accessToken}` },
      data: omit(update, "project"),
    })
      .then((response) => {
        return response.data.data as Canvas;
      })
      .catch((error) => {
        throw error;
      });
  };
}
