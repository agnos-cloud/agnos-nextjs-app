import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  HPlusMobiledata as HPlusIcon,
  Javascript as JsIcon,
  Lock as PrivateIcon,
  TextIncrease as APlusIcon,
} from "@mui/icons-material";
import router from "next/router";
import Image from "next/image";
import type { Project } from "@models/project";

export interface ProjectCardProps {
  project: Project;
}

const ProjectCard = (props: ProjectCardProps) => {
  const { project } = props;
  const theme = useTheme();

  const handleCardClick = () => {
    router.push(`/projects/${project._id}`);
  };

  const handleShareClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    alert("hooray");
  };

  return (
    <Card
      sx={{
        display: "flex",
        px: theme.spacing(1),
        cursor: "pointer",
        "&:hover": { backgroundColor: theme.palette.action.hover },
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ pt: theme.spacing(1.5) }}>
        <Image src={project.picture || ""} alt={project.name} width={32} height={32} />
      </Box>
      <Stack spacing={theme.spacing(-1)}>
        <CardHeader
          title={
            <Stack spacing={theme.spacing(-1)}>
              <Typography gutterBottom variant="subtitle2">
                {project.name} <sup>{project.private && <PrivateIcon fontSize="small" sx={{ fontSize: 8 }} />}</sup>
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: 8 }}>
                Created {new Date(project.createdAt).toDateString()}
              </Typography>
            </Stack>
          }
          sx={{ p: theme.spacing(1) }}
        />
        <CardContent sx={{ p: theme.spacing(1), height: 80 }}>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", height: "80%" }}>
            <Typography variant="caption" color="text.secondary">
              {project.description}
            </Typography>
          </div>
        </CardContent>
        <CardActions disableSpacing sx={{ p: 0, pb: theme.spacing(1), pl: theme.spacing(0.5) }}>
          <IconButton aria-label="share" size="small" onClick={handleShareClick}>
            <JsIcon sx={{ fontSize: 25 }} />
          </IconButton>
          <IconButton aria-label="share" size="small" onClick={handleShareClick}>
            <HPlusIcon sx={{ fontSize: 15 }} />
          </IconButton>
          <IconButton aria-label="share" size="small" onClick={handleShareClick}>
            <APlusIcon sx={{ fontSize: 12 }} />
          </IconButton>
        </CardActions>
      </Stack>
    </Card>
  );
};

export default ProjectCard;
