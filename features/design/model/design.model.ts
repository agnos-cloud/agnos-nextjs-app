import type { Model as BaseModel } from "@models/base";
import type { User } from "@models/user";
import { Project } from "@models/project";

export interface Design extends Omit<DesignInput, "project">, BaseModel {
  project: string | Project | null;
  user: string | User | null;
}

export interface DesignUpdate extends Omit<DesignInput, "name"> {
  name?: string;
}

export interface DesignInput {
  name: string;
  description?: string;
  picture?: string;
  project: string;
}
