import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardEditComponent } from './card-edit/card-edit.component';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  @Input() item: any;
  @Output() emitText: EventEmitter<{ id: number; text: string }> = new EventEmitter();
  @Output() emitCardItem: EventEmitter<{ card: any; increase: boolean }> = new EventEmitter();
  @Output() emitDeleteCard: EventEmitter<string> = new EventEmitter();

  commentInput = ''
  open = false;

  constructor(private editCardPopup: MatDialog) { }

  ngOnInit(): void {}

  onOpenComment() {
    console.log('opening ')
    this.open = !this.open
  }

  onCommentTextEmit(id: number) {
    this.emitText.emit({ id, text: this.commentInput });
    this.commentInput = ''
  }

  onCardItemEmit(card: any, increase: boolean) {
    console.log('emitting ')
    this.emitCardItem.emit({ card, increase });
  }

  onCardDelete(id: string) {
    console.log('deleting '+id)
    this.emitDeleteCard.emit(id)
  }

  openPopup(): void{
    const EditCardPopupRef = this.editCardPopup.open(CardEditComponent, {
      height: '70%',
      width: '50%',
    });

    EditCardPopupRef.componentInstance.attribs = this.item.attributes;

    EditCardPopupRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    })
  }
}
