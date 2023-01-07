import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/services/board.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { List } from 'src/app/models/list';
import mongoose, { ObjectId } from 'mongoose';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { WebRequestService } from 'src/app/services/web-request.service';
import { HttpClient } from '@angular/common/http';
import { Card } from 'src/app/models/card';
import { CardEditComponent } from '../board-item/card-edit/card-edit.component';

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
  crossRefSidePanelOpen: boolean;
  selectedRequirement: any;

  constructor(
    public boardService: BoardService,
    private localStore: LocalStorageService,
    private eventEmitterService: EventEmitterService,
    private webReqService: WebRequestService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    console.log('BOARD - INIT');
    this.projName = this.localStore.getData("currProjName");
    this.projId = this.localStore.getData("currProjId");

    // const projObjectId = new mongoose.Types.ObjectId(this.projId);
    this.boardService.getBoard$(this.projId).subscribe((response)=>{
      console.log("Board gotten ON-INIT in board.component: ");
      console.log(response);
      this.board$ = response;
    });

    this.crossRefSidePanelOpen = false;
    // this.selectedRequirement = {} as Card;

    // if (this.eventEmitterService.subsVar==undefined) {
    //   this.eventEmitterService.subsVar = this.eventEmitterService.
    //   updateCard.subscribe((name:string) => {
    //     this.updateCard();
    //   });
    // }
  }

  setSelectedRequirement(item: any){
    this.selectedRequirement = item;
  }

  //TOGGLE crossRefSidePanelOpen
  toggleCrossRefSidePanelOpen(){
    this.crossRefSidePanelOpen = !this.crossRefSidePanelOpen;
  }

  // DONE
  onColorChange(color: string, listId: string) {
    this.boardService.changeListColor(color, listId).subscribe((response)=>{
      console.log("Board gotten after color change in board.component: ");
      console.log(response);
      this.board$ = response;
    });
  }

  // DONE
  onAddCard(text: string, position: number, listRef: string) {
    if(text) {
      this.boardService.addCard(text, position, listRef).subscribe((response)=>{
        console.log("Board gotten after adding card in board.component: ");
        console.log(response);
        this.board$ = response;
      });
    }
  }

  // DONE
  onDeleteList(columnId: string) {
    this.boardService.deleteList(columnId).subscribe((response)=>{
      console.log("Deleted List being updated in board.component: ");
      console.log(response);
      this.board$ = response;
    });
  }

  // DONE
  onDeleteCard(cardId: string, listId: string) {
    this.boardService.deleteCard(cardId, listId).subscribe((response)=>{
      console.log("Board gotten on delete card in board.component: ");
      console.log(response);
      this.board$ = response;
    });
  }

  // updateCard(card: any) {
  //   this.boardService.updateCard(card).subscribe((response: any) =>{
  //     console.log("attrs added to cards collection");
  //     console.log(response);

  //     // this.boardComp.board$ = response;

  //   });
  // }

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

  // Function that assists in drag and drop of list items for the board
  // Calls boardService that Calls DB post request to updateBoard & Behaviour Subject
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("moveItemInArray: ");
      console.log(event);
    } else {
      console.log("Previous Container _dropListRef:");
      console.log(event.previousContainer._dropListRef);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log("transferArrayItem: ");
      console.log(event);
    }

    this.boardService.updateBoard(this.board$);
  }

  dropIntoReferences(event: CdkDragDrop<string[]>){
    // Logic to make a copy and add to references of the Selected Requirement

    console.log("This dropped:");
    console.log(event.previousContainer.data[event.previousIndex]);

    console.log("Refernces:");
    console.log(this.selectedRequirement.crossReferences);

    var referenceItem: any;
    referenceItem = event.previousContainer.data[event.previousIndex];

    console.log("referenceItem._id:");
    console.log(referenceItem._id);




    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    // else if (this.selectedRequirement.crossReferences.indexOf(referenceItem.requirement) === -1){
    else {
      var isPresent: boolean;
      isPresent = false;

      for(let ref of this.selectedRequirement.crossReferences){
        if (ref.requirement == referenceItem.requirement){
          return;
        }
      }

      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }



    // // need to clone, otherwise mutation will affect the source visual
    // const visual = referenceItem.clone();
    // // insert at index where dragged
    // event.container.data.splice(event.currentIndex, 0, visual);
    // // HACK which is the reason I created the GitHub issue
    // // the parent resets the cdk-drops when this emits
    // this.resetDragSources.emit();
    // event.source._dragRef.reset();



    // // Update behavior object present in Board (this file itself)
    // const prevData = event.previousContainer.data;


    // this.selectedRequirement.crossReferences.push(referenceItem._id);


    // this.boardService.upsertCrossReference(referenceItem, this.selectedRequirement);
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
