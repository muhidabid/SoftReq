import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoarditemsComponent } from './boarditems.component';

describe('BoarditemsComponent', () => {
  let component: BoarditemsComponent;
  let fixture: ComponentFixture<BoarditemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoarditemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoarditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
