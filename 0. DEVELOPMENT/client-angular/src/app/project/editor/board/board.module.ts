import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { BoardItemComponent } from './board-item/board-item.component';
import { CommentItemComponent } from './comment-item/comment-item.component';

import { DialogModule } from '../dialog/dialog.module';
import { ColorPanelComponent } from './color-panel/color-panel.component';
import { CardEditComponent } from './board-item/card-edit/card-edit.component';
// import { BoardItemPopupComponent } from './board-item-popup/board-item-popup.component';

@NgModule({
  declarations: [
    BoardComponent,
    BoardItemComponent,
    CommentItemComponent,
    ColorPanelComponent,
    CardEditComponent,
    // BoardItemPopupComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatExpansionModule,
    FormsModule,
    DialogModule
  ],
  exports: [
    BoardComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BoardModule { }
