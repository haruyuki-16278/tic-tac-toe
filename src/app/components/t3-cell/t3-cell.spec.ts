import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T3Cell } from './t3-cell';

describe('T3Cell', () => {
  let component: T3Cell;
  let fixture: ComponentFixture<T3Cell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [T3Cell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(T3Cell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
