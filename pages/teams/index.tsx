import { Grid } from "@mui/material";
import { useGetTeams } from "../../hooks/team.hook";
import type { Team } from "../../models/Team";

export default function Teams() {
    const { teams } = useGetTeams();
    // const teams: Team[] = [];
  return (
    <Grid container spacing={1}>
        {teams.map((t: any) => t as Team).map((team: Team) => (<Grid item xs={12} sm={4}>{team.name}</Grid>))}
    </Grid>
  );
}
