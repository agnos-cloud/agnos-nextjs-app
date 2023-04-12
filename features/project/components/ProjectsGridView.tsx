import { useUser } from "@auth0/nextjs-auth0";
import { Grid } from "@mui/material";
import router from "next/router";
import { useEffect, useState } from "react";
import { useCreatePluginForm } from "../../../hooks/plugin.hooks";
import type { Plugin } from "../../../models/Plugin";
import PluginService from "../../../services/PluginService";
import ErrorBox from "../../../components/ErrorBox";
import Fab from "../../../components/Fab";
import Loading from "../../../components/Loading";
import MultiPurposeDialog from "../../../components/MultiPurposeDialog";
import PluginCard from "../../../components/PluginCard";

export interface ProjectsGridViewProps {
  orgId?: string;
}

function ProjectsGridView(props: ProjectsGridViewProps) {
  const { orgId: teamId } = props;
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const { name, description, private: isPrivate, form } = useCreatePluginForm();

  const handleNewPluginClick = () => {
    setOpenDialog(true);
  };

  const handleSubmitNewPluginClick = () => {
    setOpenDialog(false);
    if (user) {
      setIsLoading(true);
      new PluginService(user)
        .create({
          name,
          description,
          private: isPrivate,
          team: teamId,
        })
        .then((plugin) => {
          setIsLoading(false);
          router.push(`/plugins/${plugin._id}`);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    } else {
      // TODO:
    }
  };

  if (error) {
    return <ErrorBox error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid container spacing={1}>
      {plugins.map((plugin) => (
        <Grid key={plugin._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <PluginCard plugin={plugin} />
        </Grid>
      ))}

      <MultiPurposeDialog
        open={openDialog}
        title="Create New Plugin"
        onClose={() => setOpenDialog(false)}
        actions={[
          {
            text: "Cancel",
            onClick: () => setOpenDialog(false),
          },
          {
            text: "Submit",
            onClick: handleSubmitNewPluginClick,
          },
        ]}
      >
        {form}
      </MultiPurposeDialog>

      <Fab onClick={handleNewPluginClick} />
    </Grid>
  );
}

export default ProjectsGridView;
