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
import socket from "@utils/socket";
import ModelService from "@services/model";
import { Model, ModelInput, ModelUpdate } from "@models/model";

export interface ProjectModelsViewProps {
  project: Project;
  readonly?: boolean;
}

let schemaToCreate: object | undefined = undefined;

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
  const {
    createdItem: createdProjectModel,
    create: createProjectModel,
    creatingItem: creatingProjectModel,
    creatingItemError: creatingProjectModelError,
  } = useApi<ModelService, Model, ModelInput, ModelUpdate>(ModelService, user);

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

  useEffect(() => {
    console.log(">>>>>>>>");
    console.log(socket);
    const channel = typeof project.canvas === "string" ? `canvas:${project.canvas}` : `canvas:${project.canvas?._id}`;
    console.log(channel);
    socket.on(channel, (event) => {
      setNodes((curr) => [
        ...curr,
        { id: "test", type: "test", position: { x: 100, y: 100 }, data: { label: "test" } },
      ]);
    });
  }, []);

  const onChange = (schema: string) => {
    console.log(JSON.parse(schema));
    // projectToCreate = project;
    try {
      schemaToCreate = JSON.parse(schema);
    } catch (e) {}
  };

  const newProjectModelForm = useMemo(() => <CreateProjectModelForm onChange={onChange} />, []);

  const handleSubmit = () => {
    console.log(schemaToCreate);
    if (schemaToCreate) {
      createProjectModel({ name: "just testing", project: project._id, schema: schemaToCreate });
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
    schemaToCreate = undefined;
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
