import * as internal from "stream";

export interface Comment{
  id: number;
  text: string;
}

export interface Card{
  id: number;
  requirement: string;
  version: number;
  comments: Comment[];
  listRef: string;
  position: number;

  attributes: any[];
  notes: string;

  qualityConcerns: any[];
  ambiguityConcerns: any[];
}
