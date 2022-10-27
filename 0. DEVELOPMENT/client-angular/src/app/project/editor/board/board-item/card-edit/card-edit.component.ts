import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectAddPopupComponent } from 'src/app/dashboard/project-add-popup/project-add-popup.component';
import { BoardService } from 'src/app/services/board.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { BoardComponent } from '../../board/board.component';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

  /** Error when invalid control is dirty, touched, or submitted. */
  // export class MyErrorStateMatcher implements ErrorStateMatcher {
  //   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
  //     const isSubmitted = form && form.submitted;
  //     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  //   }
  // }

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  // matcher = new MyErrorStateMatcher();

  public card;
  public addButtShow = false;
  public attrToAdd: any [] = [];;
  public attrKey: any;
  public attrValue: any;


  public temp;

  constructor(
    public dialogRef: MatDialogRef<ProjectAddPopupComponent>,
    public boardService: BoardService,
    private eventEmitterService: EventEmitterService
    // private boardComp: BoardComponent
    // @Inject(MAT_DIALOG_DATA) public data: null,
  ) { }

  ngOnInit(): void {
  }

  closePopup(): void{
    this.dialogRef.close();
  }

  toggleAddAttr(): void{
    this.addButtShow = !this.addButtShow;
  }

  addAttrs(): void{
    if(this.attrKey!=null && this.attrValue!=null){
      let newAttr = {"key": this.attrKey, "value": this.attrValue};
      console.log("newAttr:");
      console.log(newAttr);

      // this.attrToAdd.push(newAttr);
      // console.log("attrToAdd after concat: ");
      // console.log(newAttr);

      this.card.attributes.push(newAttr);
      console.log("this.card.attributes after concat: ");
      console.log(this.card.attributes);
      // console.log("Adding attribute: ");
      // console.log("Name: ");
      // console.log(this.attrKey);
      // console.log("Value: ");
      // console.log(this.attrValue);
      // window.location.reload();
    }
  }

  saveCard(): void{
    // this.eventEmitterService.updateCard();
    // this.closePopup();
    this.boardService.updateCard(this.card);
    window.location.reload();
    // this.boardService.updateCard(this.card).subscribe((response: any) =>{
    //   console.log("attrs added to cards collection");
    //   console.log(response);

    //   // this.boardComp.board$ = response;
    //   this.closePopup();
    // });
  }
}
