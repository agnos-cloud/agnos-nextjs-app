import { useUser } from "@auth0/nextjs-auth0";
import { Grid } from "@mui/material";
import { EmptyBox, ErrorBox, Fab, Loading } from "@components";
import { useProjects } from "@hooks/project";
import { useEffect, useMemo } from "react";
import { useApp } from "@hooks/base";
import { DialogOptions } from "@types";
import CreateProjectForm from "./CreateProjectForm";
import { ProjectInput } from "@models/project";
import ProjectCard from "./ProjectCard";

export interface ProjectsGridViewProps {
  org?: string;
}

let newProject: Omit<ProjectInput, "org"> | undefined = undefined;

function ProjectsGridView(props: ProjectsGridViewProps) {
  const { org } = props;
  const { user } = useUser();
  const query = useMemo(
    () => ({
      ...(org && { org }),
    }),
    [org]
  );
  const { data: projects, loading, error, create, creating, createError } = useProjects(user, query);
  const { openDialog, closeDialog, setDialogIsLoading } = useApp();

  useEffect(() => {
    handleCloseDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  useEffect(() => {
    setDialogIsLoading(creating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creating]);

  const onChange = (project: Omit<ProjectInput, "org">) => {
    newProject = project;
  };

  const newProjectForm = useMemo(() => <CreateProjectForm onChange={onChange} />, []);

  const handleSubmit = () => {
    if (newProject) {
      create({ ...newProject, org: org as string });
    }
  };

  const newProjectArgs: DialogOptions = useMemo(
    () => ({
      title: "New Project",
      content: newProjectForm,
      actions: [
        {
          text: "Cancel",
          onClick: () => {
            handleCloseDialog();
          },
        },
        {
          text: "Submit",
          onClick: handleSubmit,
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleOpenDialog = () => openDialog(newProjectArgs);

  const handleCloseDialog = () => {
    newProject = undefined;
    closeDialog();
  };

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
              onClick: handleOpenDialog,
            },
          ]}
        />
      ) : (
        projects.map((proj) => (
          <Grid key={proj._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ProjectCard project={proj} />
          </Grid>
        ))
      )}

      <Fab onClick={handleOpenDialog} />
    </Grid>
  );
}

export default ProjectsGridView;
