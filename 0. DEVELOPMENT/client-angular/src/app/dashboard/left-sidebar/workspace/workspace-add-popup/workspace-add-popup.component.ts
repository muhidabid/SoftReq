import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-workspace-add-popup',
  templateUrl: './workspace-add-popup.component.html',
  styleUrls: ['./workspace-add-popup.component.css']
})
export class WorkspaceAddPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WorkspaceAddPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
  ) { }

  ngOnInit(): void {
  }

  closePopup(): void{
    this.dialogRef.close();
  }
}
