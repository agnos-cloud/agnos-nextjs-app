import type { UserProfile } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import type { Org } from "@models/org";
import OrgService from "@services/org";

export function useOrg(user: UserProfile | undefined, id: string | undefined) {
  const [data, setData] = useState<Org | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      if (id) {
        new OrgService(user)
          .get(id)
          .then((response) => {
            setData(response);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(new Error(error));
            setIsLoading(false);
          });
      } else {
        new OrgService(user)
          .getMyOrg()
          .then((response) => {
            setData(response);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(new Error(error));
            setIsLoading(false);
          });
      }
    }
  }, [user, id]);

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    error,
    setError,
  } as const;
}
