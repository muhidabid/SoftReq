import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectAddPopupComponent } from 'src/app/dashboard/project-add-popup/project-add-popup.component';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {
  attribs;
  public addButtShow = false;
  attrKey;
  attrValue;
  attrType;

  constructor(
    public dialogRef: MatDialogRef<ProjectAddPopupComponent>,
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

  addAttr(): void{
    console.log("Adding attribute: ");
    console.log("Name: ");
    console.log(this.attrKey);
    console.log("Value: ");
    console.log(this.attrValue);


  }
}
