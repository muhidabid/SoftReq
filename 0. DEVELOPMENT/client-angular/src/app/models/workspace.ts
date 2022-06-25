// This file is a template for the workspace object
import { Project } from './project'

export interface Workspace {
  name: string;
  description: string;
  projects: Project[];
}
