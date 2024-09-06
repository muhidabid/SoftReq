import { TestBed } from '@angular/core/testing';

import { UserstoriesService } from './userstories.service';

describe('UserstoriesService', () => {
  let service: UserstoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserstoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
