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
  AdminPanelSettings as AdminIcon,
  Edit as WriteIcon,
  HPlusMobiledata as HPlusIcon,
  Javascript as JsIcon,
  Lock as PrivateIcon,
  TextIncrease as APlusIcon,
  Visibility as ReadIcon,
} from "@mui/icons-material";
import router from "next/router";
import Image from "next/image";
import { PermissionName } from "@constants/permissions";
import type { Project } from "@models/project";
import { Component } from "@models/component";
import { Design } from "@models/design";

export interface ModelCardProps {
  model: Component | Design | Project;
  permission?: PermissionName;
}

const ModelCard = (props: ModelCardProps) => {
  const { model, permission } = props;
  const theme = useTheme();

  const handleCardClick = () => {
    if ("version" in model) {
      router.push(`/components/${model._id}`);
    } else if ("project" in model) {
      router.push(
        `/projects/${typeof model.project === "string" ? model.project : model.project?._id}/designs/${model._id}`
      );
    } else {
      router.push(`/projects/${model._id}`);
    }
  };

  const handleShareClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    alert("hooray");
  };
  console.log(permission);

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
        <Image src={model.picture || ""} alt={model.name} width={32} height={32} />
      </Box>
      <Stack spacing={theme.spacing(-1)}>
        <CardHeader
          title={
            <Stack spacing={theme.spacing(-1)}>
              <Typography gutterBottom variant="subtitle2">
                {model.name}{" "}
                <sup>
                  {"private" in model && model.private && <PrivateIcon fontSize="small" sx={{ fontSize: 8 }} />}
                  {permission === PermissionName.admin && <AdminIcon fontSize="small" sx={{ fontSize: 8 }} />}
                  {permission === PermissionName.read && <ReadIcon fontSize="small" sx={{ fontSize: 8 }} />}
                  {permission === PermissionName.write && <WriteIcon fontSize="small" sx={{ fontSize: 8 }} />}
                </sup>
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: 8 }}>
                Created {new Date(model.createdAt).toDateString()}
              </Typography>
            </Stack>
          }
          sx={{ p: theme.spacing(1) }}
        />
        <CardContent sx={{ p: theme.spacing(1), height: 80 }}>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", height: "80%" }}>
            <Typography variant="caption" color="text.secondary">
              {model.description}
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

export default ModelCard;
