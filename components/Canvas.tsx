import type { Design } from "../models/Design";

export interface CanvasProps {
  design: Design;
}

const Canvas = (props: CanvasProps) => {
    const { design } = props;
  return <div>{design.name}</div>;
};

export default Canvas;
