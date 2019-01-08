import { TestBed } from '@angular/core/testing';

import { DatasourseService } from './datasourse.service';

describe('DatasourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatasourseService = TestBed.get(DatasourseService);
    expect(service).toBeTruthy();
  });
});
