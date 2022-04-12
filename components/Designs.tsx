import { useEffect, useState } from "react";
import { Fab, Grid, SxProps, useTheme, Zoom } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
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

export interface DesignsProps {
  teamId?: string;
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

function Designs(props: DesignsProps) {
  const { teamId } = props;
  const theme = useTheme();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [teamDesignShares, setTeamDesignShares] = useState<TeamDesignShare[]>(
    []
  );
  const { name, description, private: isPrivate, form } = useCreateDesignForm();

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      new TeamDesignShareService(user)
        .getTeamDesignSharesForTeam(teamId)
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

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const fab = {
    color: "primary" as "primary",
    sx: fabStyle as SxProps,
    icon: <AddIcon />,
    label: "Add",
  };

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
        <Grid
          key={teamDesignShare._id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
        >
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

      <Zoom
        key={fab.color}
        in={true}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit
      >
        <Fab
          sx={fab.sx}
          aria-label={fab.label}
          color={fab.color}
          onClick={handleNewDesignClick}
        >
          {fab.icon}
        </Fab>
      </Zoom>
    </Grid>
  );
}

export default Designs;
