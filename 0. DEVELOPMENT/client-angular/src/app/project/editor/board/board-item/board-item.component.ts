import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardService } from 'src/app/services/board.service';
import { CardEditComponent } from './card-edit/card-edit.component';
import * as Grammarly from "@grammarly/editor-sdk";
// import {GrammarlyEditorPluginElement  } from "@grammarly/editor-sdk";


@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  @Input() item: any;
  @Output() emitText: EventEmitter<{ id: number; text: string }> = new EventEmitter();
  @Output() emitCardItem: EventEmitter<{ card: any; increase: boolean }> = new EventEmitter();
  @Output() emitDeleteCard: EventEmitter<string> = new EventEmitter();

  commentInput = ''
  open = false;

  constructor(
    private editCardPopup: MatDialog,
    public boardService: BoardService
    ) { }

  ngOnInit(): void {
    // Grammarly.init("client_RCyGDZmGyUSKUmkZnPV3mA");
  }

  onOpenComment() {
    console.log('opening ')
    this.open = !this.open
  }

  onCommentTextEmit(id: number) {
    this.emitText.emit({ id, text: this.commentInput });
    this.commentInput = ''
  }

  onCardItemEmit(card: any, increase: boolean) {
    console.log('emitting ')
    this.emitCardItem.emit({ card, increase });
  }

  onCardDelete(id: string) {
    console.log('deleting '+id)
    this.emitDeleteCard.emit(id)
  }

  openPopup(): void{
    const EditCardPopupRef = this.editCardPopup.open(CardEditComponent, {
      height: '70%',
      width: '50%',
    });

    EditCardPopupRef.componentInstance.card = this.item;

    EditCardPopupRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    })
  }

  extract_quality(){
    // this.boardService.extract_quality(["The look and feel of the page should be nice.", "As a team member, I want to have a schedule of more coworking slots, so that I can work in tandem with the rest of the team on a more regular basis."]);
    // const x = this.boardService.extract_quality([req]);
    // console.log("Printing result in board-item:");
    // console.log(x[req]);


    const x = this.boardService.extract_quality(this.item);



    // after quality concerns are added to the DB
    // window.location.reload();
  }
}
