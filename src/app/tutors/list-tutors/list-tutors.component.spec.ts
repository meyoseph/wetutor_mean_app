import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTutorsComponent } from './list-tutors.component';

describe('ListTutorsComponent', () => {
  let component: ListTutorsComponent;
  let fixture: ComponentFixture<ListTutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTutorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
