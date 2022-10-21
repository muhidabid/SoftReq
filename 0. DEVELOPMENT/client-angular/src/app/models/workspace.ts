// This file is a template for the workspace object
import { ObjectId } from 'mongoose';
import { Project } from './project'

export interface Workspace {
  _id: ObjectId;
  name: string;
  description: string;
  projectsRef: [string];
  // projectIDs: [ObjectId];
}
