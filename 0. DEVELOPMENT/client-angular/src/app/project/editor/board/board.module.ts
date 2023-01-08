import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { BoardItemComponent } from './board-item/board-item.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {MatRadioModule} from '@angular/material/radio';

import { DialogModule } from '../dialog/dialog.module';
import { ColorPanelComponent } from './color-panel/color-panel.component';
import { CardEditComponent } from './board-item/card-edit/card-edit.component';
import { HighlighterPipe } from './board-item/highlighter.pipe';
// import { BoardItemPopupComponent } from './board-item-popup/board-item-popup.component';
import { TextareaHighlightComponent } from 'src/app/reusable-tool-components/textarea-highlight/textarea-highlight.component';

@NgModule({
  declarations: [
    BoardComponent,
    BoardItemComponent,
    CommentItemComponent,
    ColorPanelComponent,
    CardEditComponent,
    HighlighterPipe,
    TextareaHighlightComponent,
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
    DialogModule,
    MatSliderModule,
    BrowserAnimationsModule,
    NgxSliderModule,
    MatRadioModule,
    AppRoutingModule,
    RouterTestingModule,
    RouterModule.forRoot([])
  ],
  exports: [
    BoardComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BoardModule { }
