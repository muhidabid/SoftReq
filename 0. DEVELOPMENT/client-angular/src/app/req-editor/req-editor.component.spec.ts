import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqEditorComponent } from './req-editor.component';

describe('ReqEditorComponent', () => {
  let component: ReqEditorComponent;
  let fixture: ComponentFixture<ReqEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
