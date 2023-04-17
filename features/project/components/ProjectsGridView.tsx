import { useUser } from "@auth0/nextjs-auth0";
import { Grid } from "@mui/material";
import { EmptyBox, ErrorBox, Fab, Loading } from "@components";
import { useEffect, useMemo } from "react";
import { useApi, useApp } from "@hooks/base";
import { DialogOptions } from "@types";
import CreateProjectForm from "./CreateProjectForm";
import { Project, ProjectInput, ProjectUpdate } from "@models/project";
import ProjectCard from "./ProjectCard";
import { LogType } from "@constants/log";
import router from "next/router";
import ProjectService from "@services/project";

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
    list: projects,
    fetchList: fetchProjects,
    fetchingList: fetchingProjects,
    fetchingListError: fetchingProjectsError,
    createdItem: createdProject,
    create,
    creatingItem: creatingProject,
    creatingItemError: creatingProjectError,
  } = useApi<ProjectService, Project, ProjectInput, ProjectUpdate>(ProjectService, user);
  const { openDialog, closeDialog, setDialogIsLoading, openToast } = useApp();

  // this hook fetches projects when the user or query changes
  useEffect(() => {
    fetchProjects(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, query]);

  // this hook closes the dialog when the list of projects changes (either due to a new project being created or a project being deleted)
  useEffect(() => {
    handleCloseDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  // this hook opens the toast when there is an error creating a project
  useEffect(() => {
    if (creatingProjectError) {
      handleOpenToast(creatingProjectError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatingProjectError]);

  // this hook redirects to the new project when it is created
  useEffect(() => {
    if (createdProject) {
      router.push(`/projects/${createdProject._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdProject]);

  // this hook sets the dialog to loading when the project is being created
  useEffect(() => {
    setDialogIsLoading(creatingProject);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatingProject]);

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

  if (fetchingProjects) {
    return <Loading />;
  }

  if (fetchingProjectsError) {
    return <ErrorBox error={fetchingProjectsError} />;
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
