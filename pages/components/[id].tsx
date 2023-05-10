import { ComponentView } from "@views/component";
import { useRouter } from "next/router";

export default function Item() {
  const location = useRouter();
  const { id } = location.query;

  return <ComponentView id={id as string} />;
}
