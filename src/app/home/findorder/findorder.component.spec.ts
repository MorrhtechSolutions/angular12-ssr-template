import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindorderComponent } from './findorder.component';

describe('FindorderComponent', () => {
  let component: FindorderComponent;
  let fixture: ComponentFixture<FindorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
