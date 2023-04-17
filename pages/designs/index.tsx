import { useUser } from "@auth0/nextjs-auth0";
import DesignsComponent from "../../components/Designs";
import { LoginBackdrop } from "@components";

export default function Designs() {
  const { user } = useUser();

  if (!user) {
    return <LoginBackdrop />;
  }

  return <DesignsComponent />;
}
