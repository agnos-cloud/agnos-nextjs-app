import type { Model } from "./Model";
import type { User } from "./User";

export interface Settings extends SettingsInput, Model {
  user?: User;
}

export interface SettingsInput {
  autoSave?: boolean;
  colorMode?: "DARK" | "LIGHT";
  useGrayscaleIcons?: boolean;
}
