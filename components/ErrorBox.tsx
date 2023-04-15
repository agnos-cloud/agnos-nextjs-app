import { Grid } from "@mui/material";

export interface ErrorProps {
  error: Error | undefined;
}

const ErrorBox = ({ error }: ErrorProps) => {
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={3}>
        {error?.message}
      </Grid>
    </Grid>
  );
};

export default ErrorBox;
