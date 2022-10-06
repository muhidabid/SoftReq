import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-req-editor',
  templateUrl: './req-editor.component.html',
  styleUrls: ['./req-editor.component.css']
})
export class ReqEditorComponent implements OnInit {

  title = 'UserStoryForm';
  usInputForm: FormGroup;

  // get these values direct from MongoDB !!
  projectOptions = [
    'welcome project',
    'frontend X',
    'backend Y',
    'Web app 2'
  ]
  constructor(private fb:FormBuilder) {
    this.usInputForm = fb.group({});
   }

  ngOnInit(): void {
    this.usInputForm = this.fb.group({
      us1Input: this.fb.control(''),
      us2Input: this.fb.control(''),
      projectInput: this.fb.control('default')
    })
  }

}
