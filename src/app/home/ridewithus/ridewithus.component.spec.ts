import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidewithusComponent } from './ridewithus.component';

describe('RidewithusComponent', () => {
  let component: RidewithusComponent;
  let fixture: ComponentFixture<RidewithusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidewithusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RidewithusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
