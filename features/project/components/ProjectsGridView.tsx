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
import { LogType } from "@constants/log";
import router from "next/router";

export interface ProjectsGridViewProps {
  org?: string;
}

let projectToCreate: Omit<ProjectInput, "org"> | undefined = undefined;

function ProjectsGridView(props: ProjectsGridViewProps) {
  const { org } = props;
  const { user } = useUser();
  const query = useMemo(
    () => ({
      ...(org && { org }),
      "@sort": { updatedAt: "desc" as "desc" | "asc" },
    }),
    [org]
  );
  const {
    data: projects,
    loading,
    error,
    create,
    creating,
    createError,
    newData: newProject,
  } = useProjects(user, query);
  const { openDialog, closeDialog, setDialogIsLoading, openToast } = useApp();

  useEffect(() => {
    handleCloseDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  useEffect(() => {
    if (createError) {
      handleOpenToast(createError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createError]);

  useEffect(() => {
    if (newProject) {
      router.push(`/projects/${newProject._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProject]);

  useEffect(() => {
    setDialogIsLoading(creating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creating]);

  const onChange = (project: Omit<ProjectInput, "org">) => {
    projectToCreate = project;
  };

  const newProjectForm = useMemo(() => <CreateProjectForm onChange={onChange} />, []);

  const handleSubmit = () => {
    if (projectToCreate) {
      create({ ...projectToCreate, org: org as string });
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
    projectToCreate = undefined;
    closeDialog();
  };

  const handleOpenToast = (error: Error) =>
    openToast({
      message: error.message,
      type: LogType.ERROR,
    });

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
