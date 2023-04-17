import { useApp as useAppPrototype } from "@providers/base";

export function useApp() {
  const app = useAppPrototype();

  return {
    ...app,
  } as const;
}
