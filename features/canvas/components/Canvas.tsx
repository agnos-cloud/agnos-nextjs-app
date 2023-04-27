import { Box, Grid } from "@mui/material";
import { Obj } from "@types";
import ReactFlow, { Node, Background, MiniMap, Edge, Connection, NodeTypes, Controls } from "reactflow";
import "reactflow/dist/base.css";
import "reactflow/dist/style.css";

type CanvasProps = {
  edges: Edge[];
  nodes: Node[];
  nodeColor: (node: Node) => string;
  nodeTypes?: Obj;
  onConnect: (params: Edge | Connection) => void;
};

const Canvas = (props: CanvasProps) => {
  const { edges, nodes, nodeColor, nodeTypes, onConnect } = props;

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes as NodeTypes}
        fitView={true}
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
