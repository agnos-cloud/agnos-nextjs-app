import type { Model } from "./Model";

export interface Membership extends Model {
  permission: string;
  permissionValue: number;
  teamId: string;
  teamName?: string;
  teamPicture?: string;
  userId: string;
  userName?: string;
  userPicture?: string;
}
