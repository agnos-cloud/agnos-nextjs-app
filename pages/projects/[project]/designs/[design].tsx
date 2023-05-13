import { useRouter } from "next/router";

export default function Item() {
  const location = useRouter();
  const { project, design } = location.query;

  return (
    <>
      Design with ID {design} in project with ID {project}
    </>
  );
}
