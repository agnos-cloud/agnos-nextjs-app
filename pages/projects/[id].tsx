import { ProjectView } from "@views/project";
import { useRouter } from "next/router";

export default function Item() {
  const location = useRouter();
  const { id } = location.query;

  return <ProjectView id={id as string} />;
}
