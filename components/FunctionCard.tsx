import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Lock as PrivateIcon,
  MoreVert as MoreVertIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import router from "next/router";
import type { Function } from "../models/Function";

export interface FunctionCardProps {
  function: Function;
}

const FunctionCard = (props: FunctionCardProps) => {
  const { function: func } = props;

  const handleCardClick = () => {
    router.push(`/functions/${func._id}`);
  };

  const handleOptionsClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    alert("options");
  };

  const handleShareClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    alert("hooray");
  };

  return (
    <Card sx={{ display: "flex" }} onClick={handleCardClick}>
      <CardActionArea>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={handleOptionsClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography gutterBottom variant="h5" component="div">
              {func.name} {func.private && <PrivateIcon fontSize="small" />}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle2" color="text.secondary">
              Created {new Date(func.createdAt).toDateString()}
            </Typography>
          }
        />
        <CardMedia component="img" image={func.picture} alt={func.name} />
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">
            {func.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share" onClick={handleShareClick}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default FunctionCard;
