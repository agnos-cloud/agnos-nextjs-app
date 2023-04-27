import { useUser } from "@auth0/nextjs-auth0";
import { Box, Grid } from "@mui/material";
import { EmptyBox, ErrorBox, Fab, Loading } from "@components";
import { useCallback, useEffect, useMemo } from "react";
import { useApi, useApp } from "@hooks/base";
import { DialogOptions } from "@types";
import { Project, ProjectInput, ProjectUpdate } from "@models/project";
import { CreateProjectModelForm } from "@components/project";
import { LogType } from "@constants/log";
import ReactFlow, {
  ReactFlowProvider,
  Node,
  addEdge,
  Background,
  MiniMap,
  Edge,
  Connection,
  Panel,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { Canvas as CanvasInterface } from "@models/canvas";
import router from "next/router";
import ProjectService from "@services/project";
import { Canvas } from "@components/canvas";

export interface ProjectModelsViewProps {
  project: Project;
  readonly?: boolean;
}

let projectToCreate: Omit<ProjectInput, "org"> | undefined = undefined;

const nodeTypes = {};

const nodeColor = (node: Node) => {
  switch (node.type) {
    case "data":
      return "#f07706";
    case "locals":
      return "#00340a";
    case "module":
      return "#4a255f";
    case "resource":
      return "#243690";
    case "variable":
      return "#03881b";
    case "variables":
      return "#03881b";
    default:
      return "#ff0072";
  }
};

function ProjectModelsView(props: ProjectModelsViewProps) {
  const { project, readonly } = props;
  const { user } = useUser();
  const { openDialog, closeDialog, setDialogIsLoading, openToast } = useApp();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((params: Edge | Connection) => setEdges((els) => addEdge(params, els)), [setEdges]);
  useEffect(() => {
    if (project && project.canvas && typeof project.canvas !== "string") {
      const canvas: CanvasInterface = project.canvas;
      setNodes(canvas.nodes);
      // setEdges(canvas.edges);
    }
  }, [project]);

  const onChange = (model: string) => {
    console.log(JSON.parse(model));
    // projectToCreate = project;
  };

  const newProjectModelForm = useMemo(() => <CreateProjectModelForm onChange={onChange} />, []);

  const handleSubmit = () => {
    if (projectToCreate) {
      // createProject({ ...projectToCreate, org: org as string });
    }
  };

  const newProjectArgs: DialogOptions = useMemo(
    () => ({
      title: "New Project Model",
      content: newProjectModelForm,
      maxWidth: "xl",
      actions: [
        {
          text: "Cancel",
          onClick: () => {
            handleCloseDialog();
          },
        },
        {
          text: "Submit",
          onClick: handleSubmit,
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleOpenDialog = () => openDialog(newProjectArgs);

  const handleCloseDialog = () => {
    projectToCreate = undefined;
    closeDialog();
  };

  const handleOpenToast = (error: Error) =>
    openToast({
      message: error.message,
      type: LogType.error,
    });

  if (false) {
    return <Loading />;
  }

  if (false) {
    return <ErrorBox error={new Error()} />;
  }

  if (!project.canvas) {
    return <EmptyBox message="Project has no canvas" />;
  }

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ReactFlowProvider>
        <Canvas edges={edges} nodes={nodes} nodeColor={nodeColor} nodeTypes={nodeTypes} onConnect={onConnect} />
      </ReactFlowProvider>

      {!readonly && <Fab onClick={handleOpenDialog} />}
    </Box>
  );
}

export default ProjectModelsView;
