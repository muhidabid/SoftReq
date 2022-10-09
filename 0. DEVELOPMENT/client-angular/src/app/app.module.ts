import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { LeftSidebarComponent } from './dashboard/left-sidebar/left-sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkspaceAddButtonComponent } from './dashboard/left-sidebar/workspace/workspace-add-button/workspace-add-button.component';
import { WorkspaceExpansionPanelComponent } from './dashboard/left-sidebar/workspace/workspace-expansion-panel/workspace-expansion-panel.component';
import { WorkspaceAddPopupComponent } from './dashboard/left-sidebar/workspace/workspace-add-popup/workspace-add-popup.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProjectComponent } from './project/project.component';
import { EditorComponent } from './project/editor/editor.component';
import { WorkspaceService } from './services/workspace.service';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProjectAddPopupComponent } from './dashboard/project-add-popup/project-add-popup.component';
// import { BoardComponent } from './project/board/board.component';
// import { ListComponent } from './project/list/list.component';
// import { CardComponent } from './project/card/card.component';
// import { ListitemsComponent } from './project/editor/listitems/listitems.component';
// import { BoarditemsComponent } from './project/editor/boarditems/boarditems.component';
import { ReqEditor2Component } from './req-editor2/req-editor2.component';
import { TestCompComponent } from './test-comp/test-comp.component';
import { HeaderModule } from './project/editor/header/header.module';
import { BoardModule } from './project/editor/board/board.module';


@NgModule({
  declarations: [
    AppComponent,
    LeftSidebarComponent,
    DashboardComponent,
    WorkspaceAddButtonComponent,
    WorkspaceExpansionPanelComponent,
    WorkspaceAddPopupComponent,
    LoginPageComponent,
    ProjectComponent,
    EditorComponent,
    ToolbarComponent,
    ProjectAddPopupComponent,
    // BoardComponent,
    // ListComponent,
    // CardComponent,
    // ListitemsComponent,
    // BoarditemsComponent,
    ReqEditor2Component,
    TestCompComponent

//     AppComponent,
//     LeftSidebarComponent,
//     DashboardComponent,
//     WorkspaceAddButtonComponent,
//     WorkspaceExpansionPanelComponent,
//     WorkspaceAddPopupComponent,
//     LoginPageComponent,
// // <<<<<<< Updated upstream
//     ProjectComponent,
//     EditorComponent,
//     ToolbarComponent,
//     ProjectAddPopupComponent,
//     BoardComponent,
//     ListComponent,
//     CardComponent,
//     ListitemsComponent,
//     BoarditemsComponent,
//     Project2Component,
//     Card2Component
// =======
// >>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    DragDropModule,
    ReactiveFormsModule,
    HeaderModule,
    BoardModule
  ],
  providers: [WorkspaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
