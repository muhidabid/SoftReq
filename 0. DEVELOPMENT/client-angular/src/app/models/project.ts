// This file is a template for the project object

import { ObjectId } from "mongoose";

export interface Project {
  name: string;
  description: string;
  workspaceRef: String;
  listsRef: ObjectId[];
}
