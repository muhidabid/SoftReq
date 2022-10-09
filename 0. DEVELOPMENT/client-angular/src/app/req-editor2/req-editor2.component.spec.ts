import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqEditor2Component } from './req-editor2.component';

describe('ReqEditor2Component', () => {
  let component: ReqEditor2Component;
  let fixture: ComponentFixture<ReqEditor2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqEditor2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqEditor2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
