import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddPopupComponent } from './project-add-popup.component';

describe('ProjectAddPopupComponent', () => {
  let component: ProjectAddPopupComponent;
  let fixture: ComponentFixture<ProjectAddPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAddPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
