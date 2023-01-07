import { ObjectId } from "mongoose";
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
  listRef: ObjectId;
  position: number;

  attributes: any[];
  notes: string;
  priority: number;
  stability: boolean;
  legalLiability: string;

  qualityConcerns: any[];
  ambiguityConcerns: any[];
}
