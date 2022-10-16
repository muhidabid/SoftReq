import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css']
})
export class TestCompComponent implements OnInit {

  title = 'UserStoryForm';
  public usInputForm: FormGroup;

  // get these values direct from MongoDB !!
  projectOptions = [
  'welcome project',
  'frontend X',
  'backend Y',
  'Web app 2'
]

  constructor(private fb:FormBuilder) { 

  }

  ngOnInit(): void {
    this.usInputForm = this.fb.group(
      {
        usInput1: ['']
      }
    )
  }

}
