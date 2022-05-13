import { Project } from './project'

export interface Workspace {
  name: string;
  description: string;
  projects: Project[];
}
