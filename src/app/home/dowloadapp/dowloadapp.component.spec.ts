import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DowloadappComponent } from './dowloadapp.component';

describe('DowloadappComponent', () => {
  let component: DowloadappComponent;
  let fixture: ComponentFixture<DowloadappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DowloadappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DowloadappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
