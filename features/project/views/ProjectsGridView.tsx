import { useUser } from "@auth0/nextjs-auth0";
import { Grid } from "@mui/material";
import { EmptyBox, ErrorBox, Fab, Loading } from "@components";
import { useEffect, useMemo } from "react";
import { useApi, useApp } from "@hooks/base";
import { DialogOptions } from "@types";
import { Project, ProjectInput, ProjectUpdate } from "@models/project";
import { CreateProjectForm, ProjectCard } from "@components/project";
import { LogType } from "@constants/log";
import router from "next/router";
import ProjectService from "@services/project";
import CollaborationService from "@services/collaboration";
import { Collaboration, CollaborationInput, CollaborationUpdate } from "@models/collaboration";

export interface ProjectsGridViewProps {
  org?: string;
  shared?: boolean;
  readonly?: boolean;
}

let projectToCreate: Omit<ProjectInput, "org"> | undefined = undefined;

function ProjectsGridView(props: ProjectsGridViewProps) {
  const { readonly, org, shared } = props;
  const { user } = useUser();
  // TODO: change this query to use collaborations
  const query = useMemo(
    () => ({
      ...(org && { org }),
      // "project:ne": null,
      "@sort": { updatedAt: "desc" as "desc" | "asc" },
      "@include": [{ path: "project", select: "_id name description picture private createdAt" }],
    }),
    [org]
  );
  const {
    list: collaborations,
    fetchList: fetchCollaborations,
    fetchingList: fetchingCollaborations,
    fetchingListError: fetchingCollaborationsError,
  } = useApi<CollaborationService, Collaboration, CollaborationInput, CollaborationUpdate>(CollaborationService, user);
  const {
    list: projects,
    createdItem: createdProject,
    create: createProject,
    creatingItem: creatingProject,
    creatingItemError: creatingProjectError,
  } = useApi<ProjectService, Project, ProjectInput, ProjectUpdate>(ProjectService, user);
  const { openDialog, closeDialog, setDialogIsLoading, openToast } = useApp();

  // this hook fetches projects when the user or query changes
  useEffect(() => {
    fetchCollaborations(query);
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
      createProject({ ...projectToCreate, org: org as string });
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
      type: LogType.error,
    });

  if (fetchingCollaborations) {
    return <Loading />;
  }

  if (fetchingCollaborationsError) {
    return <ErrorBox error={fetchingCollaborationsError} />;
  }

  const collaborationsToShow = (collaborations || [])
    .filter((c) => !!c.project)
    .filter((c) =>
      shared
        ? user &&
          (c.project as Project).personal === true &&
          (c.project as Project).user?.toString() !== (user["_id"] as any).toString()
        : true
    );

  return (
    <Grid container spacing={1}>
      {!collaborationsToShow || collaborationsToShow?.length === 0 ? (
        <EmptyBox
          message="No projects found for this space"
          actions={
            readonly
              ? []
              : [
                  {
                    text: "New Project",
                    onClick: handleOpenDialog,
                  },
                ]
          }
        />
      ) : (
        collaborationsToShow.map((c) => (
          <Grid key={c._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ProjectCard project={c.project as Project} />
          </Grid>
        ))
      )}

      {!readonly && <Fab onClick={handleOpenDialog} />}
    </Grid>
  );
}

export default ProjectsGridView;
