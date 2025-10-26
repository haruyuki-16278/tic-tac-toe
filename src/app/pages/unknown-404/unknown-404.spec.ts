import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unknown404 } from './unknown-404';

describe('Unknown404', () => {
  let component: Unknown404;
  let fixture: ComponentFixture<Unknown404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unknown404]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Unknown404);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
