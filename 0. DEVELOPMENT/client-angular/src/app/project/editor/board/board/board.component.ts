import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/services/board.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { List } from 'src/app/models/list';
import mongoose from 'mongoose';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  // projId: mongoose.Types.ObjectId;
  projId: string;
  projName: string;
  board$: any;

  constructor(
    public boardService: BoardService,
    private localStore: LocalStorageService,
  ) { }

  ngOnInit(): void {
    console.log('BOARD - INIT');
    this.projName = this.localStore.getData("currProjName");
    this.projId = this.localStore.getData("currProjId");

    // const projObjectId = new mongoose.Types.ObjectId(this.projId);
    this.boardService.getBoard$(this.projId).subscribe((response)=>{
      console.log("Board gotten in board.component: ");
      console.log(response);
      this.board$ = response;
    });
  }

  onColorChange(color: string, columnId: number) {
    this.boardService.changeListColor(color, columnId)
  }

  onAddCard(text: string, columnName: string, position: number) {
    if(text) {
      this.boardService.addCard(text, columnName, position)
    }
  }

  onDeleteList(columnId: number) {
    this.boardService.deleteList(columnId)
  }

  onDeleteCard(cardId: number, columnId: number) {
    this.boardService.deleteCard(cardId, columnId)
  }

  onChangeLike(event: {card: any, increase: boolean}, columnId: number ) {
    const { card: { id }, increase } = event
    this.boardService.changeLike(id, columnId, increase)
  }

  onAddComment(event: {id: number, text: string}, columnId: number) {
    this.boardService.addComment(columnId, event.id, event.text)
  }

  onDeleteComment(comment, columnId, item) {
    this.boardService.deleteComment(columnId, item.id, comment.id)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //   }
  // }
}
