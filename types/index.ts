export type Obj = Record<string, unknown>;

export type Query = {
  "@page"?: number;
  "@size"?: number;
  "@sort"?: Record<string, "asc" | "desc">;
  "@include"?: Array<{ path: string; select?: string }>;
} & Obj;
