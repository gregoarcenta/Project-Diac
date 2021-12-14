import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenComponent } from './studen.component';

describe('StudenComponent', () => {
  let component: StudenComponent;
  let fixture: ComponentFixture<StudenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
