import type { Model } from "@models/base";
import type { User } from "../../../models/User";

export interface Settings extends SettingsInput, Model {
  user?: User;
}

export interface SettingsInput {
  autoSave?: boolean;
  colorMode?: "DARK" | "LIGHT";
  useGrayscaleIcons?: boolean;
}
