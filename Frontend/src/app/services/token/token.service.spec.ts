import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

describe('TokenService', () => {
  let service: TokenService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(TokenService);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return userId from token', () => {
    const mockToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRmYWM5MzE5NWIwYjEyYTAwZDAyNGIiLCJuYW1lIjoidGVzdEBjb20ucGwiLCJyb2xlIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNzAxNjA1NzM3LCJleHAiOjE3MDE2MTY1Mzd9.m8-uycd2kB6ChFw_DQxdJiogEq1RBmjMYiKv8fghFZg';
    spyOn(localStorageService, 'get').and.returnValue(mockToken);

    const decodedToken = service.getUserId();

    expect(decodedToken).toBeDefined();
    expect(decodedToken).toBe('654fac93195b0b12a00d024b');
  });
});
