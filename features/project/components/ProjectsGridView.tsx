import { useUser } from "@auth0/nextjs-auth0";
import { Grid } from "@mui/material";
import { EmptyBox, ErrorBox, Fab, Loading } from "@components";
import { useProjects } from "@hooks/project";
import { useMemo } from "react";
import { useApp } from "@hooks/base";
import { DialogOptions } from "@types";

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
  const { openDialog, closeDialog } = useApp();

  const newProjectArgs: DialogOptions = useMemo(
    () => ({
      title: "New Project",
      content: <div>Hello World from projects!</div>,
      actions: [
        {
          text: "Cancel",
          onClick: closeDialog,
        },
        {
          text: "Submit",
          onClick: () => {},
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  return (
    <Grid container spacing={1}>
      {!projects || projects?.length === 0 ? (
        <EmptyBox
          message="No projects found for this space"
          actions={[
            {
              text: "New Project",
              onClick: () => openDialog(newProjectArgs),
            },
          ]}
        />
      ) : (
        projects.map((proj) => (
          <Grid key={proj._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            {proj.name}
          </Grid>
        ))
      )}

      <Fab onClick={() => openDialog(newProjectArgs)} />
    </Grid>
  );
}

export default ProjectsGridView;
