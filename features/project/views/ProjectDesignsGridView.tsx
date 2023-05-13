import { useUser } from "@auth0/nextjs-auth0";
import { Grid } from "@mui/material";
import { CreateModelForm, EmptyBox, ErrorBox, Fab, Loading, ModelCard } from "@components";
import { useEffect, useMemo } from "react";
import { useApi, useApp } from "@hooks/base";
import { DialogOptions } from "@types";
import { LogType } from "@constants/log";
import router from "next/router";
import DesignService from "@services/design";
import { Design, DesignInput, DesignUpdate } from "@models/design";

export interface ProjectDesignsGridViewProps {
  project: string;
  readonly?: boolean;
}

let designToCreate: Omit<DesignInput, "project"> | undefined = undefined;

function ProjectDesignsGridView(props: ProjectDesignsGridViewProps) {
  const { project, readonly } = props;
  const { user } = useUser();
  const query = useMemo(
    () => ({
      project,
      "@sort": { updatedAt: "desc" as "desc" | "asc" },
      "@include": [{ path: "envs", select: "_id location os version" }],
    }),
    [project]
  );
  const {
    createdItem: createdDesign,
    create: createDesign,
    creatingItem: creatingDesign,
    creatingItemError: creatingDesignError,
    list: designs,
    fetchList: fetchDesigns,
    fetchingList: fetchingDesigns,
    fetchingListError: fetchingDesignsError,
  } = useApi<DesignService, Design, DesignInput, DesignUpdate>(DesignService, user);
  const { openDialog, closeDialog, setDialogIsLoading, openToast } = useApp();

  // this hook fetches designs when the user or query changes
  useEffect(() => {
    fetchDesigns(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, query]);

  // this hook closes the dialog when the list of designs changes (either due to a new project being created or a project being deleted)
  useEffect(() => {
    handleCloseDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designs]);

  // this hook opens the toast when there is an error creating a design
  useEffect(() => {
    if (creatingDesignError) {
      handleOpenToast(creatingDesignError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatingDesignError]);

  // this hook redirects to the new design when it is created
  useEffect(() => {
    if (createdDesign) {
      router.push(`/projects/${project}/designs/${createdDesign._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdDesign, project]);

  // this hook sets the dialog to loading when the design is being created
  useEffect(() => {
    setDialogIsLoading(creatingDesign);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatingDesign]);

  const onChange = (design: Omit<DesignInput, "project">) => {
    designToCreate = design;
  };

  const newDesignForm = useMemo(() => <CreateModelForm onChange={onChange} hidePrivateField />, []);

  const handleSubmit = () => {
    if (designToCreate) {
      createDesign({ ...designToCreate, project });
    }
  };

  const newDesignArgs: DialogOptions = useMemo(
    () => ({
      title: "New Design",
      content: newDesignForm,
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

  const handleOpenDialog = () => openDialog(newDesignArgs);

  const handleCloseDialog = () => {
    designToCreate = undefined;
    closeDialog();
  };

  const handleOpenToast = (error: Error) =>
    openToast({
      message: error.message,
      type: LogType.error,
    });

  if (fetchingDesigns) {
    return <Loading />;
  }

  if (fetchingDesignsError) {
    return <ErrorBox error={fetchingDesignsError} />;
  }

  return (
    <Grid container spacing={1}>
      {!designs || designs?.length === 0 ? (
        <EmptyBox
          message="No designs found for this space"
          actions={
            readonly
              ? []
              : [
                  {
                    text: "New Design",
                    onClick: handleOpenDialog,
                  },
                ]
          }
        />
      ) : (
        designs.map((d) => (
          <Grid key={d._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ModelCard model={d} />
          </Grid>
        ))
      )}

      {!readonly && <Fab onClick={handleOpenDialog} />}
    </Grid>
  );
}

export default ProjectDesignsGridView;
