import type { Env } from "../constants/env";
import type { DataType, LogType } from "../constants/log";
import type { Model } from "@models/base";

export interface Log extends Model {
  data: any;
  dataType?: DataType;
  env: Env;
  meta?: any;
  source: string;
  type?: LogType;
}
