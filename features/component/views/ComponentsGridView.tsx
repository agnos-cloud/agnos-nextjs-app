import { useUser } from "@auth0/nextjs-auth0";
import { Grid } from "@mui/material";
import { CreateModelForm, EmptyBox, ErrorBox, Fab, Loading, ModelCard } from "@components";
import { useEffect, useMemo } from "react";
import { useApi, useApp } from "@hooks/base";
import { DialogOptions } from "@types";
import { LogType } from "@constants/log";
import router from "next/router";
import CollaborationService from "@services/collaboration";
import { Collaboration, CollaborationInput, CollaborationUpdate } from "@models/collaboration";
import ComponentService from "@services/component";
import { Component, ComponentInput, ComponentUpdate } from "@models/component";

export interface ComponentsGridViewProps {
  org?: string;
  shared?: boolean;
  readonly?: boolean;
}

let componentToCreate: Omit<ComponentInput, "org" | "version"> | undefined = undefined;

function ComponentsGridView(props: ComponentsGridViewProps) {
  const { readonly, org, shared } = props;
  const { user } = useUser();
  // TODO: change this query to use collaborations
  const query = useMemo(
    () => ({
      ...(org && { org }),
      // "component:ne": null,
      "@sort": { updatedAt: "desc" as "desc" | "asc" },
      "@include": [{ path: "component", select: "_id name description picture private version createdAt" }],
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
    list: components,
    createdItem: createdComponent,
    create: createComponent,
    creatingItem: creatingComponent,
    creatingItemError: creatingComponentError,
  } = useApi<ComponentService, Component, ComponentInput, ComponentUpdate>(ComponentService, user);
  const { openDialog, closeDialog, setDialogIsLoading, openToast } = useApp();

  // this hook fetches collaborations when the user or query changes
  useEffect(() => {
    fetchCollaborations(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, query]);

  // this hook closes the dialog when the list of components changes (either due to a new component being created or a component being deleted)
  useEffect(() => {
    handleCloseDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [components]);

  // this hook opens the toast when there is an error creating a component
  useEffect(() => {
    if (creatingComponentError) {
      handleOpenToast(creatingComponentError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatingComponentError]);

  // this hook redirects to the new component when it is created
  useEffect(() => {
    if (createdComponent) {
      router.push(`/components/${createdComponent._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdComponent]);

  // this hook sets the dialog to loading when the project is being created
  useEffect(() => {
    setDialogIsLoading(creatingComponent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatingComponent]);

  const onChange = (component: Omit<ComponentInput, "org" | "version">) => {
    componentToCreate = component;
  };

  const newComponentForm = useMemo(() => <CreateModelForm onChange={onChange} />, []);

  const handleSubmit = () => {
    if (componentToCreate) {
      createComponent({ ...componentToCreate, org: org as string, version: "0.0.1" });
    }
  };

  const newComponentArgs: DialogOptions = useMemo(
    () => ({
      title: "New Component",
      content: newComponentForm,
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

  const handleOpenDialog = () => openDialog(newComponentArgs);

  const handleCloseDialog = () => {
    componentToCreate = undefined;
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
    .filter((c) => !!c.component)
    .filter((c) =>
      shared
        ? user &&
          (c.component as Component).personal === true &&
          (c.component as Component).user?.toString() !== (user["_id"] as any).toString()
        : true
    );

  return (
    <Grid container spacing={1}>
      {!collaborationsToShow || collaborationsToShow?.length === 0 ? (
        <EmptyBox
          message="No components found for this space"
          actions={
            readonly
              ? []
              : [
                  {
                    text: "New Component",
                    onClick: handleOpenDialog,
                  },
                ]
          }
        />
      ) : (
        collaborationsToShow.map((c) => (
          <Grid key={c._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ModelCard model={c.component as Component} />
          </Grid>
        ))
      )}

      {!readonly && <Fab onClick={handleOpenDialog} />}
    </Grid>
  );
}

export default ComponentsGridView;
