import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceAddPopupComponent } from './workspace-add-popup.component';

describe('WorkspaceAddPopupComponent', () => {
  let component: WorkspaceAddPopupComponent;
  let fixture: ComponentFixture<WorkspaceAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceAddPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
