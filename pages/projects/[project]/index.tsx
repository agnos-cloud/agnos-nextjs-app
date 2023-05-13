import { ProjectView } from "@views/project";
import { useRouter } from "next/router";

export default function Item() {
  const location = useRouter();
  const { project } = location.query;

  return <ProjectView id={project as string} />;
}
