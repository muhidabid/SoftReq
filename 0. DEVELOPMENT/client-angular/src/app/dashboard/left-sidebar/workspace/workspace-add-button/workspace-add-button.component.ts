import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WorkspaceAddPopupComponent } from '../workspace-add-popup/workspace-add-popup.component';

@Component({
  selector: 'app-workspace-add-button',
  templateUrl: './workspace-add-button.component.html',
  styleUrls: ['./workspace-add-button.component.css']
})
export class WorkspaceAddButtonComponent implements OnInit {

  show=false;
  constructor(private addWorkspacePopup: MatDialog) { }

  ngOnInit(): void {
  }

  openPopup(): void{
    const addPopupRef = this.addWorkspacePopup.open(WorkspaceAddPopupComponent, {
      height: '50%',
      width: '50%',
    });

    addPopupRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    })
  }
  pop(){
    this.show=true;
  }
}
