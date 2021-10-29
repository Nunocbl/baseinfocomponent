import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancySelectComponent } from './fancy-select.component';

describe('FancySelectComponent', () => {
  let component: FancySelectComponent;
  let fixture: ComponentFixture<FancySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FancySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FancySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
