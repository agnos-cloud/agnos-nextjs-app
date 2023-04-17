import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { DialogAction } from "@types";

export interface EmptyProps {
  title?: string;
  message?: string;
  actions?: DialogAction[];
}

const EmptyBox = (props: EmptyProps) => {
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
            <Typography variant="subtitle1" color="text.secondary">
              {props.message || "No items found"}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {props.actions?.map((action, index) => (
              <Button key={index} size="small" onClick={action.onClick}>
                {action.text}
              </Button>
            ))}
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};

export default EmptyBox;
