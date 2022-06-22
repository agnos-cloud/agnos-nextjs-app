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
import { Lock as PrivateIcon, MoreVert as MoreVertIcon, Share as ShareIcon } from "@mui/icons-material";
import router from "next/router";
import type { Plugin } from "../models/Plugin";

export interface PluginCardProps {
  plugin: Plugin;
}

const PluginCard = (props: PluginCardProps) => {
  const { plugin } = props;

  const handleCardClick = () => {
    router.push(`/plugins/${plugin._id}`);
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
              {plugin.name} {plugin.private && <PrivateIcon fontSize="small" />}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle2" color="text.secondary">
              Created {new Date(plugin.createdAt).toDateString()}
            </Typography>
          }
        />
        <CardMedia component="img" image={plugin.picture} alt={plugin.name} />
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">
            {plugin.description}
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

export default PluginCard;
