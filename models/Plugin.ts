import type { Menu } from "./Menu";
import type { Model } from "@models/base";
import type { Team } from "./Team";
import type { User } from "@models/user";

export interface Plugin extends Omit<PluginInput, "team">, Model {
  picture?: string;
  team?: Team;
  user?: User;
  versions?: Array<PluginVersion>;
}

export interface PluginInput {
  name: string;
  description?: string;
  private?: boolean;
  team?: string;
}

export interface PluginVersion extends Omit<PluginVersionInput, "plugin">, Model {
  menus?: Array<Menu>;
  plugin?: Plugin;
  team?: Team;
  user?: User;
}

export interface PluginVersionInput {
  name: string;
  config: string;
  description?: string;
  plugin: string;
  published: boolean;
}

export interface PluginVersionUpdate extends Omit<PluginVersionInput, "name" | "config" | "plugin" | "published"> {
  name?: string;
  config?: string;
  published?: boolean;
}
