import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { ErrorBox, Fab, Loading } from "@components/base";
import type { Membership } from "../../models/Membership";
import { useUser } from "@auth0/nextjs-auth0";
import MembershipCard from "../../components/MembershipCard";
import { LoginBackdrop } from "@components/base";
import MembershipService from "../../services/MembershipService";

//TODO: add teams => setMemberships((prev) => [...prev, {...}])
function Teams() {
  const { user } = useUser();
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleNewTeamClick = () => {
    setOpenDialog(true);
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

      <Fab onClick={handleNewTeamClick} />
    </Grid>
  );
}

export default Teams;
