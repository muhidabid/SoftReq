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

  constructor(private webReqService: WebRequestService) {}

  // getBoard$() {
  //   return this.board$.asObservable();
  // }

  // getBoard(projId: string) {
  //   // get all lists of the opened projectName
  //   return this.webReqService.post('getBoard', {projId});
  // }

  // get all lists of the opened projectName Board = List[]
  getBoard$(projId: string) {
    this.webReqService.post('getBoard', {projId}).subscribe((response)=>{
      // override board to store DB board
      this.board = response;
      // Update the board BehaviorSubject
      this.board$.next([...this.board.board.listsRef]);
    });

    return this.board$.asObservable();
  }

  changeListColor(color: string, listId: number) {
    this.board = this.board.map((list: List) => {
      if (list.id === listId) {
        list.color = color;
      }
      return list;
    });
    this.board$.next([...this.board]);
  }

  addList(title: string, position: number, projRef: string) {

    let newList;
    this.webReqService.post('addList', {title, position, projRef}).subscribe((response)=>{
      // override board to store DB board
      newList = response;
      console.log("Response for added List:");
      console.log(newList);


      // Update board
      this.board.board.listsRef = [...this.board.board.listsRef, newList.list];
      // this.board.board.listsRef.push(newList);
      // this.board = [...this.board.board.listsRef, newList];
      // Update the board BehaviorSubject
      this.board$.next([...this.board.board.listsRef]);
    });

    return this.board$.asObservable();

    // const newList: List = {
    //   id: Date.now(),
    //   title: title,
    //   color: '#009886',
    //   cardsRef: [],
    //   projectRef: mongoose.Types.ObjectId(),
    //   position: position,
    // };

    // this.board = [...this.board, newList];
    // this.board$.next([...this.board]);
  }

  addCard(text: string, listName: string, position: number, listRef: string) {
    const newCard: Card = {
      id: Date.now(),
      requirement: text,
      version: 0,
      comments: [],
      listRef: mongoose.Types.ObjectId(),
      position: position,
      attributes: [],
      notes: "",
      qualityConcerns: [],
      ambiguityConcerns: [],
    };

    this.board = this.board.map((list: List) => {
      if (list.title === listName) {
        // var x = ;
        list.cardsRef = [newCard, ...mongoose.Types.ObjectId()];
      }
      return list;
    });

    this.board$.next([...this.board]);
  }

  deleteList(listId: number) {
    this.board = this.board.filter((list: List) => list.id !== listId);
    this.board$.next([...this.board]);
  }

  deleteCard(cardId: number, listId: number) {
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
