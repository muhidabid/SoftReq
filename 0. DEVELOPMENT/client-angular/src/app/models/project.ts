// This file is a template for the project object

import { ObjectId } from "mongoose";

export interface Project {
  _id: ObjectId;
  _WID: ObjectId;
  name: string;
  description: string;
}
