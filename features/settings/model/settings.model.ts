import type { Model } from "@models/base";
import type { User } from "@models/user";

export interface Settings extends SettingsInput, Model {
  user: string | User | null;
}

export interface SettingsInput {
  autoSave?: boolean;
  colorMode?: "DARK" | "LIGHT";
  useGrayscaleIcons?: boolean;
}
