import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';
import { List } from '../models/list';
import { Card, Comment } from '../models/card';
import { WebRequestService } from './web-request.service';
import { ObjectId } from 'mongoose';
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
  private board: any = this.initBoard
  private board$ = new BehaviorSubject<any[]>(this.initBoard)
  private project: any;

  constructor(private webReqService: WebRequestService) {}

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

    return this.board$.asObservable();
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
}
