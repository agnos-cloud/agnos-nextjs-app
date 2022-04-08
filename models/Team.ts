import type { Model } from "./Model";

export interface Team extends Model {
  name: string;
  email?: string;
  private?: boolean;
  picture?: string;
  secrets?: object;
  userId: string;
}
