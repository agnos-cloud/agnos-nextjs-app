// pages/api/auth/[...auth0].js
import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";

const afterCallback = async (
  _req: any,
  _res: any,
  session: any,
  _state: any
) => {
  const { idToken, accessToken, refreshToken } = session;
  session.user.session = { idToken, accessToken, refreshToken };
  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
