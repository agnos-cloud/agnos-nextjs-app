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
import {AdminPanelSettings as AdminIcon, Edit as WriteIcon, Lock as PrivateIcon, MoreVert as MoreVertIcon, Share as ShareIcon, Visibility as ReadIcon} from '@mui/icons-material';
import router from "next/router";
import type { Membership } from "../models/Membership";

export interface MembershipCardProps {
  membership: Membership;
}

const MembershipCard = (props: MembershipCardProps) => {
  const { membership } = props;

  const handleCardClick = () => {
    router.push(`/teams/${membership.team?._id}`);
  };

  const handleOptionsClick = (e: any) => {
    e.stopPropagation();
    alert("options")
  };

  const handleShareClick = (e: any) => {
    e.stopPropagation();
    alert("hooray")
  };

  return (
    <Card sx={{ display: "flex" }} onClick={handleCardClick}>
    <CardActionArea>
       <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings" onClick={handleOptionsClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography gutterBottom variant="h5" component="div">{membership.team?.name} {membership.team?.private && <PrivateIcon fontSize="small" />}</Typography>}
        subheader={<Typography variant="subtitle2" color="text.secondary">
        Joined {new Date(membership.createdAt).toDateString()} {membership.permission?.name === "ADMIN" && <AdminIcon fontSize="small" />}{membership.permission?.name === "WRITE" && <WriteIcon fontSize="small" />}{membership.permission?.name === "READ" && <ReadIcon fontSize="small" />}
      </Typography>}
      />
        <CardMedia
          component="img"
          image={membership.team?.picture}
          alt={membership.team?.name}
        />
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">
            {membership.team?.description}
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

export default MembershipCard;
