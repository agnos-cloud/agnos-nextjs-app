import type { PluginVersion } from "./Plugin";
import type { User } from "@models/user";

export interface Installation {
  user?: User;
  plugin?: PluginVersion;
}
