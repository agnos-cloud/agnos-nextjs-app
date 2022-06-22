import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import DesignCard from "./DesignCard";
import type { TeamDesignShare } from "../models/TeamDesignShare";
import MultiPurposeDialog from "./MultiPurposeDialog";
import { useUser } from "@auth0/nextjs-auth0";
import router from "next/router";
import ErrorBox from "./ErrorBox";
import Loading from "./Loading";
import TeamDesignShareService from "../services/TeamDesignShareService";
import DesignService from "../services/DesignService";
import { useCreateDesignForm } from "../hooks/design.hooks";
import Fab from "./Fab";

export interface DesignsProps {
  teamId?: string;
}

function Designs(props: DesignsProps) {
  const { teamId } = props;
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [teamDesignShares, setTeamDesignShares] = useState<TeamDesignShare[]>([]);
  const { name, description, private: isPrivate, form } = useCreateDesignForm();

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      new TeamDesignShareService(user)
        .getMyTeamDesignShares(teamId)
        .then((response) => {
          setTeamDesignShares(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    }
  }, [user]);

  const handleNewDesignClick = () => {
    setOpenDialog(true);
  };

  const handleSubmitNewDesignClick = () => {
    setOpenDialog(false);
    if (user) {
      setIsLoading(true);
      new DesignService(user)
        .create({
          name,
          description,
          private: isPrivate,
          team: teamId,
        })
        .then((design) => {
          setIsLoading(false);
          router.push(`/designs/${design._id}`);
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
      {teamDesignShares.map((teamDesignShare) => (
        <Grid key={teamDesignShare._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DesignCard teamDesignShare={teamDesignShare} />
        </Grid>
      ))}

      <MultiPurposeDialog
        open={openDialog}
        title="Create New Design"
        onClose={() => setOpenDialog(false)}
        actions={[
          {
            text: "Cancel",
            onClick: () => setOpenDialog(false),
          },
          {
            text: "Submit",
            onClick: handleSubmitNewDesignClick,
          },
        ]}
      >
        {form}
      </MultiPurposeDialog>

      <Fab onClick={handleNewDesignClick} />
    </Grid>
  );
}

export default Designs;
