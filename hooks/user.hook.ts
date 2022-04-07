import { useEffect, useState } from "react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import { TokensLocalStorage } from "../services/LocalStorageService";
// import axios from "axios";

const tokensStorage = new TokensLocalStorage();

export function useLoggedInUser() {
  const { user, error, isLoading } = useUser();
  const [loggedInUser, setLoggedInUser] = useState<UserProfile | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isLoading && !error) {
      setLoggedInUser(user);

      if (!user) return;

      const session: any = user["session"];
      if (!session) return; console.log(session)

      tokensStorage.saveAccessToken(session.accessToken);
      tokensStorage.saveIdToken(session.idToken);
      tokensStorage.saveRefreshToken(session.refreshToken);

      // // create user in database if the email is unique
      // axios
      //   .post(`${process.env.API_URL}/users`, {
      //     name: user.name,
      //     email: user.email,
      //     emailIsVerified: user.email_verified,
      //     picture: user.picture,
      //   })
      //   .then((response) => console.log(response.data))
      //   // .then((data) => console.log(data))
      //   .catch((e) => console.log(e));
    } else {
      setLoggedInUser(undefined);
    }
  }, [user, error, isLoading]);

  return loggedInUser;
}
