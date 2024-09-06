import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import {GrammarlyButtonElement, GrammarlyEditorPluginCallbacks, GrammarlyEditorPluginElement, GrammarlyEditorPluginElementEventMap} from '@grammarly/editor-sdk';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as Grammarly from "@grammarly/editor-sdk";

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(): void {
    Grammarly.init("client_RCyGDZmGyUSKUmkZnPV3mA");
  }

}
