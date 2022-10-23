import { ObjectId } from "mongoose";
import * as internal from "stream";
import { Card } from "./card";

export interface List{
  id: number;
  title: string;
  color: string;
  cardsRef: ObjectId[];
  projectRef: ObjectId;
  position: number;
}
