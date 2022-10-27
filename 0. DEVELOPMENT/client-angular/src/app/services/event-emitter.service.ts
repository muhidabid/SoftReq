import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  _updateCard = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  updateCard() {
    this._updateCard.emit();
  }
}
