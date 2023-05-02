import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeContent } from "./NodeContent";

const ModelNode = ({ id, data }: Partial<NodeProps>) => {
  return (
    <>
      <Handle type="target" id={id} position={Position.Top} isConnectable={false} />
      <div className="title" title={data?.description}>
        {data?.title}
      </div>
      <NodeContent id={id} data={data.properties || {}} />
    </>
  );
};

ModelNode.displayName = "ModelNode";

export default memo(ModelNode);
