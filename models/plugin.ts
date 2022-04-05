import type { Component } from "./component";

export type PluginType = "components" | "config_file";

export type Plugin = {
  id: string;
  type: PluginType,
  title: string;
  description?: string;
  components?: Component[];
};
