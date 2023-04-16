import type { UserProfile } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import type { Project, ProjectInput } from "@models/project";
import ProjectService from "@services/project";
import { Query } from "@types";

export function useProjects(user: UserProfile | undefined, query: Query | undefined) {
  const [data, setData] = useState<Array<Project> | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [creating, setCreating] = useState<boolean>(false);
  const [createError, setCreateError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (user) {
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
      setCreating(true);
      setTimeout(() => {
        setData((data: Array<Project> | undefined) => [
          {
            _id: "hdhdh",
            org: "hss",
            user: "jdjddkkd",
            name: project.name,
            private: project.private,
            picture: "https://agnos-cdn.s3.amazonaws.com/favicon.png",
            description: project.description,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          ...(data || []),
        ]);
        setCreating(false);
      }, 3000);
      //   new ProjectService(user)
      //     .create(project)
      //     .then((response) => {
      //       setData((data: Array<Project> | undefined) => [...(data || []), response]);
      //       setCreating(false);
      //     })
      //     .catch((error) => {
      //       setCreateError(new Error(error));
      //       setCreating(false);
      //     });
    }
  };

  return {
    data,
    loading,
    error,
    create,
    createError,
    creating,
  } as const;
}
