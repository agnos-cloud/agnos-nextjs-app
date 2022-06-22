import type { UserProfile } from "@auth0/nextjs-auth0";
import React, { useEffect, useState } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Background,
  Elements,
  BackgroundVariant,
  Node,
  Edge,
  Connection,
  OnLoadParams,
  Controls,
  MiniMap,
  ArrowHeadType,
  ConnectionLineType,
  updateEdge,
} from "react-flow-renderer";
import { useSettings } from "../hooks/settings.hooks";
import type { Design } from "../models/Design";

export interface CanvasProps {
  design: Design;
  user: UserProfile | undefined;
}

const Canvas = (props: CanvasProps) => {
  const { design, user } = props;
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const [graphDirection, setGraphDirection] = useState<"LR" | "TB">("TB");
  const [selectedNode, setSelectedNode] = useState<null | Node<any>>(null);
  const { autoSave, setAutoSave, useGrayscaleIcons, setUseGrayscaleIcons } = useSettings(user);

  // set size
  useEffect(() => {
    // const body = document.getElementsByTagName("body")[0];
    // body.style.height = "98vh";
    // body.style.width = "98vw";
    // const main = document.getElementsByTagName("main")[0];
    // main.style.height = "100%";
    // main.style.width = "100%";
    // const application = document.getElementById(
    //   "single-spa-application:@agnos/agnos-web-designer"
    // );
    // application.style.height = "100%";
    // application.style.width = "100%";
  }, []);
  return <div>{design.name}</div>;
};

export default Canvas;
