import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';
import { List } from '../models/list';
import { Card, Comment } from '../models/card';

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
      cards: [{
        id: 0,
        requirement: "Requirement here",
        version: 0,
        comments: [{id:0, text: "Some comment"}],
        listRef: "List.title",
        position: 0,

        attributes: [{"name": "string", value: "any"}],
        notes: "string",

        qualityConcerns: [],
        ambiguityConcerns: [],
      },],
      projectRef: "Project.name",
      position: 0,
    },
  ]

  private board: List[] = this.initBoard
  private board$ = new BehaviorSubject<List[]>(this.initBoard)

  getBoard$() {
    return this.board$.asObservable()
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

  addList(title: string, projectRef: string, position: number) {
    const newList: List = {
      id: Date.now(),
      title: title,
      color: '#009886',
      cards: [],
      projectRef: projectRef,
      position: position,
    };

    this.board = [...this.board, newList];
    this.board$.next([...this.board]);
  }

  addCard(text: string, listName: string, position: number) {
    const newCard: Card = {
      id: Date.now(),
      requirement: text,
      version: 0,
      comments: [],
      listRef: listName,
      position: position,
      attributes: [],
      notes: "",
      qualityConcerns: [],
      ambiguityConcerns: [],
    };

    this.board = this.board.map((list: List) => {
      if (list.title === listName) {
        list.cards = [newCard, ...list.cards];
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
    this.board = this.board.map((list: List) => {
      if (list.id === listId) {
        list.cards = list.cards.filter((card: Card) => card.id !== cardId);
      }
      return list;
    });

    this.board$.next([...this.board]);
  }

  changeLike(cardId: number, listId: number, increase: boolean) {
    this.board = this.board.map((list: List) => {
      if (list.id === listId) {
        const card = list.cards.map((card: Card) => {
          if (card.id === cardId) {
            if (increase) {
              card.version++;
            } else {
              if (card.version > 0) {
                card.version--;
              }
            }
          }
          return card;
        });

        list.cards = card;
        return list;
      } else {
        return list;
      }
    });

    this.board$.next([...this.board]);
  }

  addComment(listId: number, cardId: number, text: string) {
    this.board = this.board.map((list: List) => {
      if (list.id === listId) {
        const card = list.cards.map((card: Card) => {
          if (card.id === cardId) {
            const newComment = {
              id: Date.now(),
              text,
            };
            card.comments = [newComment, ...card.comments];
          }
          return card;
        });

        list.cards = card;
      }
      return list;
    });

    this.board$.next([...this.board]);
  }

  deleteComment(listId: number, itemId: number, commentId: number) {
    this.board = this.board.map((list: List) => {
      if(list.id === listId) {
        const card = list.cards.map((item)=> {
          if(item.id === itemId) {
            item.comments = item.comments.filter((comment: Comment) => {
              return comment.id !== commentId
            })
          }
          return item
        })
        list.cards = card
      }
      return list
    })
    this.board$.next([...this.board])
  }
}
