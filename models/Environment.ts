import type { Component } from "./Component";

export interface Environment {
  name: string;
  components?: Array<Component>;
  secrets?: {};
}
