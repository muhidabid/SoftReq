import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WorkspaceAddPopupComponent } from '../workspace-add-popup/workspace-add-popup.component';

@Component({
  selector: 'app-workspace-add-button',
  templateUrl: './workspace-add-button.component.html',
  styleUrls: ['./workspace-add-button.component.css']
})
export class WorkspaceAddButtonComponent implements OnInit {

  constructor(private addWorkspacePopup: MatDialog) { }

  ngOnInit(): void {
  }

  openPopup(): void{
    const addPopupRef = this.addWorkspacePopup.open(WorkspaceAddPopupComponent, {
      width: '250px',
    });

    addPopupRef.afterClosed().subscribe(result => {
      console.log('The popup was closed');
    })
  }
}
