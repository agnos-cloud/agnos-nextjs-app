import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { LoginBackdrop } from "@components";
import { ProjectDesignsGridView } from "@views/project";

export default function List() {
  const { user } = useUser();
  const location = useRouter();
  const { project } = location.query;

  if (!user) {
    return <LoginBackdrop />;
  }

  return <ProjectDesignsGridView project={project as string} />;
}
