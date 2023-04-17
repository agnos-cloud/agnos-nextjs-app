import type { UserProfile } from "@auth0/nextjs-auth0";
import { Query } from "@types";

export abstract class ApiService<ReturnType, InputType, UpdateType> {
  protected accessToken: string | undefined = undefined;
  protected apiUrl: string | undefined = process.env.API_URL;

  constructor(user: UserProfile | undefined) {
    if (user) {
      const session: any = user["session"];
      this.accessToken = session.accessToken;
    }
  }

  abstract create: (input: InputType) => Promise<ReturnType>;
  abstract get: (id?: string) => Promise<ReturnType>;
  abstract getMany: (query?: Query) => Promise<ReturnType[]>;
}
