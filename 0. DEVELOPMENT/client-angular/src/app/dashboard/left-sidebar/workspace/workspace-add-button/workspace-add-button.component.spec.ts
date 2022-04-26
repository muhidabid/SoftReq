import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceAddButtonComponent } from './workspace-add-button.component';

describe('WorkspaceAddButtonComponent', () => {
  let component: WorkspaceAddButtonComponent;
  let fixture: ComponentFixture<WorkspaceAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceAddButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
