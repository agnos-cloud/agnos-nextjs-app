import type { Model as BaseModel } from "@models/base";
import type { User } from "@models/user";
import { Project } from "@models/project";

export interface Model extends Omit<ModelInput, "events" | "project">, BaseModel {
  project: string | Project | null;
  user: string | User | null;
}

export interface ModelUpdate extends Omit<ModelInput, "name" | "schema"> {
  name?: string;
  schema?: object;
}

export interface ModelInput {
  name: string;
  description?: string;
  events?: Array<ModelEvent>;
  schema: object;
  project: string;
}

export type ModelEventType =
  | "model_created"
  | "model_updated"
  | "model_deleted"
  | "model_field_created"
  | "model_field_updated"
  | "model_field_deleted";

export interface ModelEvent {
  type: ModelEventType;
  model?: string;
  before?: object;
  after?: object;
}
