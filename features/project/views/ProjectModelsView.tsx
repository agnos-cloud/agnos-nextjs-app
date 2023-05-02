import { useUser } from "@auth0/nextjs-auth0";
import { Box } from "@mui/material";
import { EmptyBox, Fab } from "@components";
import { useCallback, useEffect, useMemo } from "react";
import { useApi, useApp } from "@hooks/base";
import { DialogOptions, Obj } from "@types";
import { Project } from "@models/project";
import { CreateProjectModelForm } from "@components/project";
import { LogType } from "@constants/log";
import { ReactFlowProvider, Node, addEdge, Edge, Connection, useNodesState, useEdgesState } from "reactflow";
import { Canvas as CanvasInterface } from "@models/canvas";
import { Canvas } from "@components/canvas";
import { Canvas as CanvasModel, CanvasInput, CanvasUpdate } from "@models/canvas";
import CanvasService from "@services/canvas";
import socket from "@utils/socket";
import ModelService from "@services/model";
import { Model, ModelInput, ModelUpdate } from "@models/model";
import { ModelNode } from "@components/model";

export interface ProjectModelsViewProps {
  project: Project;
  readonly?: boolean;
}

let schemaToCreate: Obj | undefined = undefined;

const nodeTypes = {
  model: ModelNode,
};

const nodeColor = (node: Node) => {
  switch (node.type) {
    case "model":
      return "#4587f1";
    default:
      return "#4587f1";
  }
};

function ProjectModelsView(props: ProjectModelsViewProps) {
  const { project, readonly } = props;
  const { user } = useUser();
  const { openDialog, closeDialog, setDialogIsLoading, openToast } = useApp();
  const {
    list: models,
    create: createProjectModel,
    creatingItem: creatingProjectModel,
    creatingItemError: creatingProjectModelError,
  } = useApi<ModelService, Model, ModelInput, ModelUpdate>(ModelService, user);
  const { update: updateProjectCanvas } = useApi<CanvasService, CanvasModel, CanvasInput, CanvasUpdate>(
    CanvasService,
    user
  );

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback((params: Edge | Connection) => setEdges((els) => addEdge(params, els)), [setEdges]);

  // this hook subscribes to the canvas channel for real-time updates
  useEffect(() => {
    const channel = typeof project.canvas === "string" ? `canvas:${project.canvas}` : `canvas:${project.canvas?._id}`;
    socket.on(channel, (event) => {
      if (event.type === "canvas_updated") {
        setNodes(event.nodes);
      } else if (event.type === "node_added") {
        setNodes((curr) => [...curr, event.node]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // this hook sets the nodes and edges when the project is loaded
  useEffect(() => {
    if (project && project.canvas && typeof project.canvas !== "string") {
      const canvas: CanvasInterface = project.canvas;
      console.log(canvas.nodes);
      setNodes(canvas.nodes);
      // TODO: setEdges(canvas.edges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  // this hook sets the dialog to loading when the model is being created
  useEffect(() => {
    setDialogIsLoading(creatingProjectModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatingProjectModel]);

  // this hook opens the toast when there is an error creating a model
  useEffect(() => {
    if (creatingProjectModelError) {
      handleOpenToast(creatingProjectModelError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatingProjectModelError]);

  // this hook closes the dialog when the list of models changes (either due to a new model being created or a model being deleted)
  useEffect(() => {
    handleCloseDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [models]);

  const onChange = (schema: string) => {
    // projectToCreate = project;
    try {
      schemaToCreate = JSON.parse(schema);
    } catch (e) {}
  };

  const handleOnNodeDragStop = (_: React.MouseEvent<Element, MouseEvent>, __: Node<any>) => {
    updateProjectCanvas(undefined, { project: project._id, nodes: nodes });
  };

  const newProjectModelForm = useMemo(() => <CreateProjectModelForm onChange={onChange} />, []);

  const handleSubmit = () => {
    if (schemaToCreate) {
      if (!schemaToCreate.title) {
        openToast({
          message: "No name entered for model",
          type: LogType.error,
        });
        return;
      }

      createProjectModel({
        name: schemaToCreate.title as string,
        description: (schemaToCreate.description || "") as string,
        project: project._id,
        schema: schemaToCreate,
        events: [{ type: "model_created", after: schemaToCreate }],
      });
    }
  };

  const newProjectModelArgs: DialogOptions = useMemo(
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

  const handleOpenDialog = () => openDialog(newProjectModelArgs);

  const handleCloseDialog = () => {
    schemaToCreate = undefined;
    closeDialog();
  };

  const handleOpenToast = (error: Error) =>
    openToast({
      message: error.message,
      type: LogType.error,
    });

  if (!project.canvas) {
    return <EmptyBox message="Project has no canvas" />;
  }

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ReactFlowProvider>
        <Canvas
          edges={edges}
          nodes={nodes}
          nodeColor={nodeColor}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onNodeDragStop={handleOnNodeDragStop}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
        />
      </ReactFlowProvider>

      {!readonly && <Fab onClick={handleOpenDialog} />}
    </Box>
  );
}

export default ProjectModelsView;
