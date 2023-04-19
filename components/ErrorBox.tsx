import { Alert, Box, Card, CardContent, Grid } from "@mui/material";

export interface ErrorProps {
  error: Error | undefined;
}

const ErrorBox = ({ error }: ErrorProps) => {
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 20vh)",
          // minWidth: "100vw",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Alert severity="error">{error?.message}</Alert>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default ErrorBox;
