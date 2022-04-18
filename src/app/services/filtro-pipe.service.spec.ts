import { TestBed } from '@angular/core/testing';

import { FiltroPipeService } from './filtro-pipe.service';

describe('FiltroPipeService', () => {
  let service: FiltroPipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltroPipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
