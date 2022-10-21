export class Comment {
  id: number;
  text: string
}

export class Card {
  id: number;
  text: string;
  like: number;
  comments: Comment[]
}

export class Column {
  id: number;
  title: string;
  color: string;
  list: Card[]
}


