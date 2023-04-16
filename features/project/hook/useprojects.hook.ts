import type { UserProfile } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import type { Project, ProjectInput } from "@models/project";
import ProjectService from "@services/project";
import { Query } from "@types";
import { ApiService } from "@services/base";

export function useProjects<TService extends ApiService>(user: UserProfile | undefined, query: Query | undefined) {
  const [data, setData] = useState<Array<Project> | undefined>(undefined);
  const [newData, setNewData] = useState<Project | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [creating, setCreating] = useState<boolean>(false);
  const [createError, setCreateError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (user) {
      setError(undefined);
      setLoading(true);
      new ProjectService(user)
        .getMany(query)
        .then((response) => {
          setData(response);
          setLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setLoading(false);
        });
    }
  }, [user, query]);

  const create = (project: ProjectInput) => {
    if (user) {
      setCreateError(undefined);
      setCreating(true);
      new ProjectService(user)
        .create(project)
        .then((response) => {
          setData((data: Array<Project> | undefined) => [response, ...(data || [])]);
          setNewData(response);
          setCreating(false);
        })
        .catch((error) => {
          setCreateError(new Error(error));
          setCreating(false);
        });
    }
  };

  return {
    data,
    loading,
    error,
    create,
    createError,
    creating,
    newData,
  } as const;
}
