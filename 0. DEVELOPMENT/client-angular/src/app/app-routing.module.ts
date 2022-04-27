import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceAddPopupComponent } from './dashboard/left-sidebar/workspace/workspace-add-popup/workspace-add-popup.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { EditorComponent } from './project/editor/editor.component';

const routes: Routes = [
  {
    path: "routeToPopup",
    component: WorkspaceAddPopupComponent
  },
  {
    path: "loginPage",
    component: LoginPageComponent
  },
  {
    path: "dashBoard",
    component: DashboardComponent
  },
  {
    path: "project",
    component: ProjectComponent
  },
  {
    path: "editor",
    component: EditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [WorkspaceAddPopupComponent, LoginPageComponent, DashboardComponent]
