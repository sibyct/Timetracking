import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log debug messages', () => {
    service.debug('This is a debug message');
    expect(console.debug).toHaveBeenCalledWith('This is a debug message');
  });

  it('should log info messages', () => {
    service.info('This is an info message');
    expect(console.info).toHaveBeenCalledWith('This is an info message');
  });

  it('should log warn messages', () => {
    service.warn('This is a warn message');
    expect(console.warn).toHaveBeenCalledWith('This is a warn message');
  });

  it('should log error messages', () => {
    service.error('This is an error message');
    expect(console.error).toHaveBeenCalledWith('This is an error message');
  });
});
