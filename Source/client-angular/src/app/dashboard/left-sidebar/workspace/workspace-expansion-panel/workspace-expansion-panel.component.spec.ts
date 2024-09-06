import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceExpansionPanelComponent } from './workspace-expansion-panel.component';

describe('WorkspaceExpansionPanelComponent', () => {
  let component: WorkspaceExpansionPanelComponent;
  let fixture: ComponentFixture<WorkspaceExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceExpansionPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
