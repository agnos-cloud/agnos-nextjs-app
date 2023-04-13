import { useUser } from "@auth0/nextjs-auth0";
import FunctionsComponent from "../../components/Functions";
import { LoginBackdrop } from "@components/base";

export default function Functions() {
  const { user } = useUser();

  if (!user) {
    return <LoginBackdrop />;
  }

  return <FunctionsComponent />;
}
