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
  backlogRef: ObjectId;
  listRef: ObjectId;
  positionInBacklog: number;
  position: number;

  attributes: any[];
  notes: string;
  priority: number;
  stability: boolean;
  legalLiability: string;
  crossReferences: ObjectId[];

  qualityConcerns: any[];
  ambiguityConcerns: any[];
}
