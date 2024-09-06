import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';
import { List } from '../models/list';
import { Card, Comment } from '../models/card';
import { WebRequestService } from './web-request.service';
import { ObjectId } from 'mongoose';
import { HttpClient } from '@angular/common/http';
var mongoose = require('mongoose');

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private initBoard = [
    // {
    //   id: 1,
    //   title: 'To Do',
    //   color: '#009886',
    //   list: [
    //     {
    //       id: 1,
    //       text: 'Example card item',
    //       like: 1,
    //       comments: [
    //         {
    //           id: 1,
    //           text: 'Some comment'
    //         }
    //       ]
    //     },
    //   ]
    // },

    {
      id: 0,
      title: "To Do",
      color: '#009886',
      cardsRef: [{
        id: 0,
        requirement: "Requirement here",
        version: 0,
        comments: [{id:0, text: "Some comment"}],
        listRef: mongoose.Types.ObjectId(),
        position: 0,

        attributes: [{"name": "string", value: "any"}],
        notes: "string",

        qualityConcerns: [],
        ambiguityConcerns: [],
      },],
      backlogRef: mongoose.Types.ObjectId(),
      projectRef: mongoose.Types.ObjectId(),
      position: 0,
    },

    // {
    //   id: 0,
    //   title: "To Do",
    //   color: '#009886',
    //   cardsRef: [],
    //   projectRef: '6354fbda583c1fee0de1bf70',
    //   position: 0,
    // },
  ]

  // Initialize with dummy data
  private board: any = this.initBoard;
  private board$ = new BehaviorSubject<any[]>(this.initBoard);
  private boardForBacklog$ = new BehaviorSubject<any[]>(this.initBoard);
  private project: any;
  private backlog: any;

  constructor(
    private webReqService: WebRequestService,
    private http: HttpClient
    ) {}

  // getBoard$() {
  //   return this.board$.asObservable();
  // }

  // getBoard(projId: string) {
  //   // get all lists of the opened projectName
  //   return this.webReqService.post('getBoard', {projId});
  // }

  // DONE
  // get all lists of the opened projectName Board = List[]
  getBoard$(projId: string) {
    this.webReqService.post('getBoard', {projId}).subscribe((response)=>{
      // override board to store DB board
      this.project = response;
      // this.board = response;

      console.log("getBoard$ gives: ");
      console.log(this.project);

      // this.board = this.board.board.listRef;

      // Update the board BehaviorSubject
      // this.board$.next([...this.board]);
      this.board$.next([...this.project.board.listsRef]);
    });

    // returns an array of Lists
    return this.board$.asObservable();
  }

  // This function is different from getBoard in the sense
  // It returns gets the whole populated board but only returns Backlog
  getBoardForBacklog$(projId: string) {
    this.webReqService.post('getBoard', {projId}).subscribe((response)=>{
      // override board to store DB board
      this.backlog = response;

      console.log("boardForBacklog$ gives: ");
      console.log(this.backlog);

      // this.board = this.board.board.listRef;

      // Update the board BehaviorSubject
      this.boardForBacklog$.next(this.backlog.board.backlogRef);
      // this.boardForBacklog$ = this.backlog.board.backlogRef;
    });

    return this.boardForBacklog$.asObservable();
  }

  // DONE
  addList(title: string, position: number, projRef: string) {

    let newList;
    this.webReqService.post('addList', {title, position, projRef}).subscribe((response)=>{
      // override board to store DB board
      newList = response;
      console.log("Response for added List:");
      console.log(newList);

      // Update board
      this.project.board.listsRef = [...this.project.board.listsRef, newList.list];
      // Update the board BehaviorSubject
      this.board$.next([...this.project.board.listsRef]);
    });

    return this.board$.asObservable();
  }

  // DONE
  deleteList(listRef: string) {
    this.webReqService.post('deleteList', {listRef}).subscribe((response)=>{
      this.project.board.listsRef = this.project.board.listsRef.filter((list: any) => list._id !== listRef);
      this.board$.next([...this.project.board.listsRef]);
    });

    return this.board$.asObservable();
  }

  // BUG - ERROR TypeError: this.board.map is not a function
  // ERROR resolved if you change position of card
  changeListColor(color: string, listId: string) {
    this.webReqService.post('updateListColor', { color, listId }).subscribe((response)=>{
      console.log("Board object in changeListColor: ");
      console.log(this.project.board.listsRef);

      // update list color here
      this.project.board.listsRef = this.project.board.listsRef.map((list: any) => {
        if (list._id === listId) {
          // do this in DB
          list.color = color;
        }
        return list;
      });
      // Update the board BehaviorSubject
      this.board$.next([...this.project.board.listsRef]);
    });

    return this.board$.asObservable();
  }

  // DONE
  addCard(text: string, position: number, listRef: string) {

    let newCard;
    this.webReqService.post('addCard', {text, position, listRef}).subscribe((response)=>{
      // override board to store DB board
      newCard = response;
      console.log("Response for added Card:");
      console.log(newCard);

      // Update board
      console.log("Length:");
      console.log(this.project.board.listsRef.length);

      for (let i = 0; i < this.project.board.listsRef.length; i++) {
        if (this.project.board.listsRef[i]._id == listRef){
          this.project.board.listsRef[i].cardsRef = [...this.project.board.listsRef[i].cardsRef, newCard.card];
          // Update the board BehaviorSubject
          this.board$.next([...this.project.board.listsRef]);
        }
      }
    });

    return this.board$.asObservable();
  }

  // ---- Backlog ----

  addCardToBacklog(text: string, positionInBacklog: number, backlogRef: string){
    let newCard;
    this.webReqService.post('addCardToBacklog', {text, positionInBacklog, backlogRef}).subscribe((response)=>{
      // override board to store DB board
      newCard = response;
      console.log("Response for addCardToBacklog:");
      console.log(newCard);

      // Update board
      console.log("this.backlog:");
      console.log(this.backlog);

      console.log("this.boardForBacklog$::");
      console.log(this.boardForBacklog$);

      this.backlog.board.backlogRef.cardsRef = [...this.backlog.board.backlogRef.cardsRef, newCard.card];

      // Update the board BehaviorSubject
      // only sends backlog object
      // this.boardForBacklog$ = of(this.backlog.board.backlogRef.cardsRef);
      this.boardForBacklog$.next(this.backlog.board.backlogRef);
    });

    return this.boardForBacklog$.asObservable();
  }

  ////////////////////////////////////////////////


  // DONE
  updateBoard(board: any){
    this.webReqService.post('updateBoard', {board}).subscribe((response)=>{
      // override board to store DB board
      this.project.board.listsRef = board;

      console.log("getBoard$ gives: ");
      console.log(this.project.board.listsRef);

      // Update the board BehaviorSubject
      this.board$.next([...this.project.board.listsRef]);
    });
  }

  updateBacklog(backlog: any){
    this.webReqService.post('updateBacklog', {backlog}).subscribe((response)=>{
      // override this.backlog to store DB backlog
      this.backlog = backlog;

      console.log("getBacklog$ gives: ");
      console.log(this.backlog);

      // Update the backlog BehaviorSubject
      this.boardForBacklog$.next(this.backlog);
    });
  }

  // DONE
  deleteCard(cardRef: string, listRef: string) {
    this.webReqService.post('deleteCard', {cardRef}).subscribe((response)=>{
      for (let i = 0; i < this.project.board.listsRef.length; i++) {
        if (this.project.board.listsRef[i]._id == listRef){
          this.project.board.listsRef[i].cardsRef = this.project.board.listsRef[i].cardsRef.filter((card: any) => card._id !== cardRef);
        }
      }
      this.board$.next([...this.project.board.listsRef]);

      // this.board.board.listsRef = this.board.board.listsRef.filter((list: any) => list._id !== listId);
      // this.board$.next([...this.board.board.listsRef]);
    });

    return this.board$.asObservable();

    // this.board = this.board.map((list: List) => {
    //   if (list.id === listId) {
    //     list.cardsRef = list.cardsRef.filter((card: Card) => card.id !== cardId);
    //   }
    //   return list;
    // });

    // this.board$.next([...this.board]);
  }

  // DONE
  updateCard(card: any){
    this.webReqService.post('updateCard', {card}).subscribe((response)=>{
      for (let i = 0; i < this.project.board.listsRef.length; i++) {
        if (this.project.board.listsRef[i]._id == card.listRef){
          for(let j = 0; j < this.project.board.listsRef[i].cardsRef.length; j++){
            if (this.project.board.listsRef[i].cardsRef[j]._id == card._id){
              this.project.board.listsRef[i].cardsRef[j] = card;
            }
          }
        }
      }
      // this.board$.next([...this.project.board.listsRef]);
    });

    // return this.board$.asObservable();
  }

  changeLike(cardId: number, listId: number, increase: boolean) {
    // this.board = this.board.map((list: List) => {
    //   if (list.id === listId) {
    //     const card = list.cardsRef.map((card: Card) => {
    //       if (card.id === cardId) {
    //         if (increase) {
    //           card.version++;
    //         } else {
    //           if (card.version > 0) {
    //             card.version--;
    //           }
    //         }
    //       }
    //       return card;
    //     });

    //     list.cardsRef = card;
    //     return list;
    //   } else {
    //     return list;
    //   }
    // });

    // this.board$.next([...this.board]);
  }

  addComment(listId: number, cardId: number, text: string) {
    // this.board = this.board.map((list: List) => {
    //   if (list.id === listId) {
    //     const card = list.cardsRef.map((card: Card) => {
    //       if (card.id === cardId) {
    //         const newComment = {
    //           id: Date.now(),
    //           text,
    //         };
    //         card.comments = [newComment, ...card.comments];
    //       }
    //       return card;
    //     });

    //     list.cardsRef = card;
    //   }
    //   return list;
    // });

    // this.board$.next([...this.board]);
  }

  deleteComment(listId: number, itemId: number, commentId: number) {
    // this.board = this.board.map((list: List) => {
    //   if(list.id === listId) {
    //     const card = list.cardsRef.map((item)=> {
    //       if(item.id === itemId) {
    //         item.comments = item.comments.filter((comment: Comment) => {
    //           return comment.id !== commentId
    //         })
    //       }
    //       return item
    //     })
    //     list.cardsRef = card
    //   }
    //   return list
    // })
    // this.board$.next([...this.board])
  }

  // ---- CROSS REFERENCES ----

  // Upserts a single requirement reference
  addCrossReference(referenceItem: any, selectedRequirement: any){
    this.webReqService.post('addCrossReference', {referenceItem, selectedRequirement}).subscribe((response)=>{
      // Do something after DB is updated


      // override board to store DB board
      // this.project.board.listsRef = board;

      // Update the board BehaviorSubject
      // this.board$.next([...this.project.board.listsRef]);
    });
  }

  deleteCrossReference(referenceItem: any, selectedRequirement: any){
    this.webReqService.post('deleteCrossReference', {referenceItem, selectedRequirement}).subscribe((response)=>{
      console.log("this.project.board");
      console.log(this.project.board);

      for (let i = 0; i < this.project.board.listsRef.length; i++) {
        for (let j = 0; j < this.project.board.listsRef[i].cardsRef.length; j++) {
          if (this.project.board.listsRef[i].cardsRef[j]._id == selectedRequirement._id){
            this.project.board.listsRef[i].cardsRef[j].crossReferences = this.project.board.listsRef[i].cardsRef[j].crossReferences.filter((ref: any) => ref._id !== referenceItem._id);
            break;
          }
        }
      }
      this.board$.next([...this.project.board.listsRef]);
    });

    return this.board$.asObservable();
  }

  // ---- BACKLOG ----

  deleteBacklogCard(cardId: string){
    this.webReqService.post('deleteCard', {cardId}).subscribe((response)=>{
      let deletedCard: any;
      deletedCard = response;

      console.log("deleteBacklogCard this.backlog:");
      console.log(this.backlog);

      // Update observable
      this.backlog.board.backlogRef = this.backlog.board.backlogRef.cardsRef.filter((card: any) => card._id !== deletedCard._id);
      this.boardForBacklog$.next(this.backlog.board.backlogRef);
    });

    return this.boardForBacklog$.asObservable();
  }

  upsertBacklogRefInCard(backlogId, cardDroppedId){
    this.webReqService.post('upsertBacklogRefInCard', {backlogId, cardDroppedId}).subscribe((response)=>{
      let updatedCard: any;
      updatedCard = response;

      console.log("upsertBacklogRefInCard this.backlog:");
      console.log(this.backlog);

      // Update observable
      // this.backlog.board.backlogRef = this.backlog.board.backlogRef.cardsRef.filter((card: any) => card._id !== updatedCard._id);

      for(let i of this.backlog.board.backlogRef.cardsRef){
        if(this.backlog.board.backlogRef.cardsRef[i]._id === updatedCard._id){
          this.backlog.board.backlogRef.cardsRef[i].backlogRef = updatedCard.backlogRef;
        }
      }

      this.boardForBacklog$.next(this.backlog.board.backlogRef);
    });

    return this.boardForBacklog$.asObservable();
  }

  // ---- PYTHON BACKEND RELATED ----

  extract_quality(card: any):any{
    console.log("card: ");
    console.log(card)

    this.http.post<any>('http://127.0.0.1:5000/'+'extract_quality', {'req': [card.requirement]}).subscribe((response)=>{
      console.log("Quality concern response obtained: ");
      console.log(response);

      console.log("Labels: ");
      console.log(response[card.requirement]);


      // card.qualityConcerns.push(response[card.requirement]);
      card.qualityConcerns = response[card.requirement];
      console.log("CARD.quali::");
      console.log(card.qualityConcerns);


      console.log("updated card in board serv:");
      console.log(card);


      // update db
      this.webReqService.post('updateCard', {card}).subscribe((response)=>{
        for (let i = 0; i < this.project.board.listsRef.length; i++) {
          if (this.project.board.listsRef[i]._id == card.listRef){
            for(let j = 0; j < this.project.board.listsRef[i].cardsRef.length; j++){
              if (this.project.board.listsRef[i].cardsRef[j]._id == card._id){
                this.project.board.listsRef[i].cardsRef[j] = card;
              }
            }
          }
        }
        // this.board$.next([...this.project.board.listsRef]);
      });
    });
  }

  extract_ambiguity(card: any):any{
    console.log("card: ");
    console.log(card)

    this.http.post<any>('http://127.0.0.1:5000/'+'extract_ambiguity', {'req': [card.requirement]}).subscribe((response)=>{
      console.log("Ambiguous words obtained: ");
      console.log(response);

      console.log("Words: ");
      console.log(response[card.requirement]);


      // card.qualityConcerns.push(response[card.requirement]);
      card.ambiguityConcerns = response[card.requirement];

      console.log("CARD.ambi::");
      console.log(card.ambiguityConcerns);


      console.log("updated card in board serv:");
      console.log(card);


      // update db
      this.webReqService.post('updateCard', {card}).subscribe((response)=>{
        for (let i = 0; i < this.project.board.listsRef.length; i++) {
          if (this.project.board.listsRef[i]._id == card.listRef){
            for(let j = 0; j < this.project.board.listsRef[i].cardsRef.length; j++){
              if (this.project.board.listsRef[i].cardsRef[j]._id == card._id){
                this.project.board.listsRef[i].cardsRef[j] = card;
              }
            }
          }
        }
      });
    });
  }

}