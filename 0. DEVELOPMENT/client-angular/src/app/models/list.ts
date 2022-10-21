import * as internal from "stream";
import { Card } from "./card";

export interface List{
  id: number;
  title: string;
  color: string;
  cards: Card[];
  projectRef: string;
  position: number;
}
