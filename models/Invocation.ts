import type { Env } from "../constants/env";
import type { InvocationType } from "../constants/invocation";
import type { Model } from "./Model";

export interface Invocation extends Model {
  caller?: string;
  env: Env;
  error?: any;
  function: string;
  input?: any;
  meta?: any;
  output?: any;
  type?: InvocationType;
  version: string;
}
