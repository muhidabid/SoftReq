import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/services/board.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { List } from 'src/app/models/list';
import mongoose, { ObjectId } from 'mongoose';

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

  onColorChange(color: string, listId: string) {
    this.boardService.changeListColor(color, listId)
  }

  onAddCard(text: string, position: number, listRef: string) {
    if(text) {
      this.boardService.addCard(text, position, listRef).subscribe((response)=>{
        console.log("Board gotten after adding card in board.component: ");
        console.log(response);
        this.board$ = response;
      });
    }
  }

  onDeleteList(columnId: string) {
    this.boardService.deleteList(columnId).subscribe((response)=>{
      console.log("Deleted List being updated in board.component: ");
      console.log(response);
      this.board$ = response;
    });
  }

  onDeleteCard(cardId: string, listId: string) {
    this.boardService.deleteCard(cardId, listId)
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
      console.log("moveItemInArray: ");
      console.log(event);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log("transferArrayItem: ");
      console.log(event);
    }

    this.boardService.updateBoard(this.board$);
  }


  // onKeyDown($event): void {
  //   // Detect platform
  //   if(navigator.platform.match('Mac')){
  //       this.handleMacKeyEvents($event);
  //   }
  //   else {
  //       this.handleWindowsKeyEvents($event);
  //   }
  // }

  // handleMacKeyEvents($event) {
  //   // MetaKey documentation
  //   // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey
  //   let charCode = String.fromCharCode($event.which).toLowerCase();
  //   if ($event.metaKey && charCode === 's') {
  //       // Action on Cmd + S
  //       $event.preventDefault();
  //   }
  // }

  // handleWindowsKeyEvents($event) {
  //   let charCode = String.fromCharCode($event.which).toLowerCase();
  //   if ($event.ctrlKey && charCode === 's') {
  //       // Action on Ctrl + S
  //       // $event.preventDefault();
  //       console.log("Ctrl+S pressed");
  //       console.log($event);
  //   }
  // }

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
