import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurshopsComponent } from './ourshops.component';

describe('OurshopsComponent', () => {
  let component: OurshopsComponent;
  let fixture: ComponentFixture<OurshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurshopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
