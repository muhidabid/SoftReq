// This file is a template for the workspace object
import { Project } from './project'
import { ObjectId } from "mongoose";

export interface Workspace {
  _id: ObjectId;
  name: string;
  description: string;
  projects: Pick<Project, '_id'>[];
}
