import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceAddPopupComponent } from './dashboard/left-sidebar/workspace/workspace-add-popup/workspace-add-popup.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { EditorComponent } from './project/editor/editor.component';
// import { BoardComponent } from './project/board/board.component';
// import { CardComponent } from './project/card/card.component';
// import { ListComponent } from './project/list/list.component';
// import { ListitemsComponent } from './project/editor/listitems/listitems.component';
// import { BoarditemsComponent } from './project/editor/boarditems/boarditems.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ReqEditor2Component } from './req-editor2/req-editor2.component';
import { TestCompComponent } from './test-comp/test-comp.component';

const routes: Routes = [
  { path: "routeToPopup", component: WorkspaceAddPopupComponent},
  { path: "loginPage", component: LoginPageComponent},
  { path: "dashBoard", component: DashboardComponent},
  { path: "project", component: ProjectComponent},
  { path: "editor", component: EditorComponent},
  // { path: "board", component: BoardComponent},
  // { path: "card", component: CardComponent},
  // { path: "list", component: ListComponent},
  // { path: "listitems", component: ListitemsComponent},
  { path: "toolbar", component: ToolbarComponent},
  { path: "reqEditor2", component: ReqEditor2Component},
  { path: "testComp", component: TestCompComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [WorkspaceAddPopupComponent, LoginPageComponent, DashboardComponent]
