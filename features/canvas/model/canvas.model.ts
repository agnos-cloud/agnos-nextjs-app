import type { Model } from "@models/base";
import { Project } from "@models/project";
import { Node } from "reactflow";

export interface Canvas extends Omit<CanvasInput, "project">, Model {
  project?: string | Project | null;
}

export interface CanvasUpdate extends Omit<CanvasInput, "project"> {}

export interface CanvasInput {
  nodes: Array<Node>;
  project?: string;
}
