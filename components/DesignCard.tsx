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
  AdminPanelSettings as AdminIcon,
  Edit as WriteIcon,
  Lock as PrivateIcon,
  MoreVert as MoreVertIcon,
  Share as ShareIcon,
  Visibility as ReadIcon,
} from "@mui/icons-material";
import router from "next/router";
import type { TeamDesignShare } from "../models/TeamDesignShare";
// TODO: a way to show that teamDesignShare.design?.team._id === teamDesignShare.team?._id
export interface DesignCardProps {
  teamDesignShare: TeamDesignShare;
}

const DesignCard = (props: DesignCardProps) => {
  const { teamDesignShare } = props;

  const handleCardClick = () => {
    router.push(`/designs/${teamDesignShare.design?._id}`);
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
              {teamDesignShare.design?.name}{" "}
              {teamDesignShare.design?.private && (
                <PrivateIcon fontSize="small" />
              )}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle2" color="text.secondary">
              Created{" "}
              {new Date(
                teamDesignShare.design?.createdAt || teamDesignShare.createdAt
              ).toDateString()}{" "}
              {teamDesignShare.permission?.name === "ADMIN" && (
                <AdminIcon fontSize="small" />
              )}
              {teamDesignShare.permission?.name === "WRITE" && (
                <WriteIcon fontSize="small" />
              )}
              {teamDesignShare.permission?.name === "READ" && (
                <ReadIcon fontSize="small" />
              )}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          image={teamDesignShare.design?.picture}
          alt={teamDesignShare.design?.name}
        />
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">
            {teamDesignShare.design?.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share">
            <ShareIcon onClick={handleShareClick} />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default DesignCard;
