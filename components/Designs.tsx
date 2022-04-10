import { useEffect, useState } from "react";
import {
  Fab,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  SxProps,
  TextField,
  useTheme,
  Zoom,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import DesignCard from "./DesignCard";
import type { TeamDesignShare } from "../models/TeamDesignShare";
import MultiPurposeDialog from "./MultiPurposeDialog";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import router from "next/router";
import type { Design } from "../models/Design";
import ErrorBox from "./ErrorBox";
import Loading from "./Loading";
import AppBackdrop from "./AppBackdrop";
import { LOGIN_PATH } from "../constants/paths";
import Link from "next/link";

export interface DesignsProps {
  teamId?: string;
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

function Designs(props: DesignsProps) {
  const { teamId } = props; // TODO: if no teamId load default team for current user
  const theme = useTheme();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [teamDesignShares, setTeamDesignShares] = useState<TeamDesignShare[]>(
    []
  );
  const [name, setName] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const session: any = user["session"];
      const accessToken = session.accessToken;
      setIsLoading(true);
      axios({
        method: "GET",
        url: `${process.env.API_URL}/share/team-designs/for-team/${teamId}`,
        headers: { authorization: `Bearer ${accessToken}` },
      })
        .then((response) => {
          setTeamDesignShares(response.data["teamDesignShares"]);
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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleIsPrivareChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPrivate(event.target.checked);
  };

  if (error) {
    return <ErrorBox error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <AppBackdrop>
        <Link href={LOGIN_PATH}>You may need to log in</Link>
      </AppBackdrop>
    );
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
            onClick: () => {
              setOpenDialog(false);
              if (user) {
                const session: any = user["session"];
                const accessToken = session.accessToken;
                setIsLoading(true);
                axios({
                  method: "POST",
                  url: `${process.env.API_URL}/designs`,
                  headers: { authorization: `Bearer ${accessToken}` },
                  data: {
                    name,
                    description,
                    private: isPrivate,
                    team: teamId,
                  },
                })
                  .then((response) => {
                    const design: Design = response.data["design"];
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
            },
          },
        ]}
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={isPrivate} onChange={handleIsPrivareChange} />
            }
            label="Private"
          />
        </FormGroup>
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
