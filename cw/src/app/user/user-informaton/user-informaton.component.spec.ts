import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformatonComponent } from './user-informaton.component';

describe('UserInformatonComponent', () => {
  let component: UserInformatonComponent;
  let fixture: ComponentFixture<UserInformatonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInformatonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInformatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
