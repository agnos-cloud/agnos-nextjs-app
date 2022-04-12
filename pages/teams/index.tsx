import { Fab, Grid, SxProps, useTheme, Zoom } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ErrorBox from "../../components/ErrorBox";
import Loading from "../../components/Loading";
import type { Membership } from "../../models/Membership";
import { useUser } from "@auth0/nextjs-auth0";
import MembershipCard from "../../components/MembershipCard";
import LoginBackdrop from "../../components/LoginBackdrop";
import MembershipService from "../../services/MembershipService";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};
//TODO: add teams => setMemberships((prev) => [...prev, {...}])
function Teams() {
  const theme = useTheme();

  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      new MembershipService(user)
        .getMyMemberships()
        .then((response) => {
          setMemberships(response);
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

  if (error) {
    return <ErrorBox error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <LoginBackdrop />;
  }

  return (
    <Grid container spacing={1}>
      {memberships.map((membership) => (
        <Grid key={membership._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <MembershipCard membership={membership} />
        </Grid>
      ))}

      <Zoom
        key={fab.color}
        in={true}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit
      >
        <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
          {fab.icon}
        </Fab>
      </Zoom>
    </Grid>
  );
}

export default Teams;
