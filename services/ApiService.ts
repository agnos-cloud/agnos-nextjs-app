import type { UserProfile } from "@auth0/nextjs-auth0";

export default class ApiService {
  protected accessToken: string | undefined = undefined;
  protected apiUrl: string | undefined = process.env.API_URL;

  constructor(user: UserProfile | undefined) {
    if (user) {
      const session: any = user["session"];
      this.accessToken = session.accessToken;
    }
  }
}
