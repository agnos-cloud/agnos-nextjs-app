import type { Form } from "./Form";

export interface Menu {
  id: string;
  title?: string;
  items?: Array<MenuItem>;
}

export interface MenuItem {
  id: string;
  title?: string;
  image?: { src: string };
  isDivider?: boolean;
  paths?: Array<SvgPath>;
  secrets?: {}; // will be inherited by every component created from this menu
  forms?: Array<Form>;
}

export interface SvgPath {
  d: string;
  fill?: string;
  stroke?: string;
  style?: string;
  transform?: string;
}
