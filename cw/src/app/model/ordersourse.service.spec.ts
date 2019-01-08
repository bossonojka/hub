import { TestBed } from '@angular/core/testing';

import { OrdersourseService } from './ordersourse.service';

describe('OrdersourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersourseService = TestBed.get(OrdersourseService);
    expect(service).toBeTruthy();
  });
});
