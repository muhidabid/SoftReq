import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceAddButtonComponent } from './dashboard/workspace/workspace-add-button/workspace-add-button.component';
import { WorkspaceAddPopupComponent } from './dashboard/workspace/workspace-add-popup/workspace-add-popup.component';
import { UsernamePasswordComponent } from './login-page/username-password/username-password.component';
import { DashboardGridComponent } from './dashboard/dashboard-grid/dashboard-grid.component';

const routes: Routes = [
  {
    path: "routeToPopup",
    component: WorkspaceAddPopupComponent
  },
  {
    path: "loginPage",
    component: UsernamePasswordComponent
  },
  {
    path: "dashBoard",
    component: DashboardGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [WorkspaceAddPopupComponent, UsernamePasswordComponent, DashboardGridComponent]
