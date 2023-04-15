import type { UserProfile } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import type { Project } from "@models/project";
import ProjectService from "@services/project";

export function useProject(user: UserProfile | undefined, id: string) {
  const [data, setData] = useState<Project | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      new ProjectService(user)
        .get(id)
        .then((response) => {
          setData(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    }
  }, [user, id]);

  //   useEffect(() => {
  //     const saveSettings = async () => {
  //       if (!user) return;

  //       new SettingsService(user).update({
  //         useGrayscaleIcons,
  //         autoSave,
  //         colorMode,
  //       });
  //     };

  //     saveSettings();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [data]);

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    error,
    setError,
  } as const;
}
