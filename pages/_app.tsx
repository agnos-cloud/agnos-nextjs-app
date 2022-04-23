import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";

import FullLayout from "../components/Layouts/FullLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <FullLayout>
        <Component {...pageProps} />
      </FullLayout>
    </UserProvider>
  );
}

export default MyApp;
