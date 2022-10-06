import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceAddPopupComponent } from './dashboard/left-sidebar/workspace/workspace-add-popup/workspace-add-popup.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { EditorComponent } from './project/editor/editor.component';
import { BoardComponent } from './project/board/board.component';
import { CardComponent } from './project/card/card.component';
import { ListComponent } from './project/list/list.component';
import { ListitemsComponent } from './project/editor/listitems/listitems.component';
import { BoarditemsComponent } from './project/editor/boarditems/boarditems.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ReqEditorComponent } from './req-editor/req-editor.component';

const routes: Routes = [
  { path: "routeToPopup", component: WorkspaceAddPopupComponent},
  { path: "loginPage", component: LoginPageComponent},
  { path: "dashBoard", component: DashboardComponent},
  { path: "project", component: ProjectComponent},
  { path: "editor", component: EditorComponent},
  { path: "board", component: BoardComponent},
  { path: "card", component: CardComponent},
  { path: "list", component: ListComponent},
  { path: "listitems", component: ListitemsComponent},
  { path: "toolbar", component: ToolbarComponent},
  { path: "reqEditor", component: ReqEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [WorkspaceAddPopupComponent, LoginPageComponent, DashboardComponent, ListitemsComponent]
