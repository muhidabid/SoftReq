import { Project } from './project'

export interface Workspace {
  name: string;
  projects: Project[];
}
