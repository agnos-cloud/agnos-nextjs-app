import { Box } from "@mui/material";
import { Obj } from "@types";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/base.css";
import "reactflow/dist/style.css";

type OnChange<ChangesType> = (changes: ChangesType[]) => void;

type CanvasProps = {
  edges: Edge[];
  nodes: Node[];
  nodeColor: (node: Node) => string;
  nodeTypes?: Obj;
  onConnect: (params: Edge | Connection) => void;
  onEdgesChange: OnChange<EdgeChange>;
  onNodesChange: OnChange<NodeChange>;
};

const Canvas = (props: CanvasProps) => {
  const { edges, nodes, nodeColor, nodeTypes, onConnect, onEdgesChange, onNodesChange } = props;

  const handleOnNodeDragStop = (event: React.MouseEvent<Element, MouseEvent>, node: Node<any>) => {
    console.log(event);
    console.log(node);
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView={true}
        nodeTypes={nodeTypes as NodeTypes}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={handleOnNodeDragStop}
        onNodesChange={onNodesChange}
      >
        <Background />
        {/* <CustomControls
        showUploadDialog={!props.integrated}
        onUploadClick={handleOpenModal}
        onEditorClick={handleOpenDialog}
      /> */}
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </Box>
  );
};

export default Canvas;
