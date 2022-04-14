import type { PluginVersion } from "./Plugin";
import type { User } from "./User";

export interface Installation {
    user?: User;
    plugin?: PluginVersion;
  }