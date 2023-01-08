import { ObjectId } from "mongoose";

export interface List{
  backlogRef: ObjectId;
  projectRef: ObjectId;
}
