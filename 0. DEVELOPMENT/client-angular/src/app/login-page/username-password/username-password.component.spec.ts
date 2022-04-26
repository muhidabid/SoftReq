import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernamePasswordComponent } from './username-password.component';

describe('UsernamePasswordComponent', () => {
  let component: UsernamePasswordComponent;
  let fixture: ComponentFixture<UsernamePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernamePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernamePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
