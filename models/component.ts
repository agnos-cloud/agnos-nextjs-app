import type { Provider } from "./provider";

export type Component = {
  id: string;
  title?: string;
  image?: { src: string };
  isDivider?: boolean;
  paths?: ComponentPath[];
  providers: Provider[];
};

export type ComponentPath = {
  d: string;
  fill?: string;
  stroke?: string;
  style?: string;
  transform?: string;
};
