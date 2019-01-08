import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderStoreComponent } from './slider-store.component';

describe('SliderStoreComponent', () => {
  let component: SliderStoreComponent;
  let fixture: ComponentFixture<SliderStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
