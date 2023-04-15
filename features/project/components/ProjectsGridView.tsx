import { useUser } from "@auth0/nextjs-auth0";
import { Grid } from "@mui/material";
import { ErrorBox, Fab, Loading } from "@components/base";
import { useProjects } from "@hooks/project";
import { useMemo } from "react";

export interface ProjectsGridViewProps {
  org?: string;
}

function ProjectsGridView(props: ProjectsGridViewProps) {
  const { org } = props;
  const { user } = useUser();
  const query = useMemo(
    () => ({
      ...(org && { org }),
    }),
    [org]
  );
  const { data: projects, loading, error } = useProjects(user, query);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  return (
    <Grid container spacing={1}>
      {!projects || projects?.length === 0 ? (
        <ErrorBox error={new Error("No projects!")} />
      ) : (
        projects.map((proj) => (
          <Grid key={proj._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            {proj.name}
          </Grid>
        ))
      )}

      <Fab onClick={() => {}} />
    </Grid>
  );
}

export default ProjectsGridView;
