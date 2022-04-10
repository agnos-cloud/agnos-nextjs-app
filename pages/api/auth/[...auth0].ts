// pages/api/auth/[...auth0].js
import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import axios from "axios";

const afterCallback = async (
  _req: any,
  _res: any,
  session: any,
  _state: any
) => {
  const { idToken, accessToken, refreshToken } = session;
  session.user.session = { /**idToken,**/ accessToken, refreshToken };

  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.API_URL}/sessions`,
      data: {
        email: session.user.email,
      accessToken,
      idToken,
      },
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    });
    if (response.data.session?.userId) {
      session.user._id = response.data.session.userId;
    }
  } catch (e) {
    console.log(e);
  }
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
