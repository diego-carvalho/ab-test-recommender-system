import { TestBed, inject } from '@angular/core/testing';

import { ObjPageFiveService } from './obj-page-five.service';

describe('ObjPageFiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjPageFiveService]
    });
  });

  it('should be created', inject([ObjPageFiveService], (service: ObjPageFiveService) => {
    expect(service).toBeTruthy();
  }));
});
