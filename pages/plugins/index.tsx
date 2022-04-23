import { useUser } from "@auth0/nextjs-auth0";
import PluginsComponent from "../../components/Plugins";
import LoginBackdrop from "../../components/LoginBackdrop";

export default function Designs() {
  const { user } = useUser();

  if (!user) {
    return <LoginBackdrop />;
  }

  return <PluginsComponent />;
}
