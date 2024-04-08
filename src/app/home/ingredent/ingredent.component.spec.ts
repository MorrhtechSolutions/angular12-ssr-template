import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredentComponent } from './ingredent.component';

describe('IngredentComponent', () => {
  let component: IngredentComponent;
  let fixture: ComponentFixture<IngredentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
