import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditablefieldComponent } from './editablefield.component';

describe('EditablefieldComponent', () => {
  let component: EditablefieldComponent;
  let fixture: ComponentFixture<EditablefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditablefieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditablefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
