import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a current user after initialization', () => {
    expect(service.currentUser()).toBeTruthy();
    expect(service.currentUser()?.name).toBe('Иван Петров');
  });

  it('should be logged in after initialization', () => {
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should logout user', () => {
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
    expect(service.currentUser()).toBeNull();
  });

  it('should get users list', (done) => {
    service.getUsers().subscribe(users => {
      expect(users).toBeTruthy();
      expect(users.length).toBeGreaterThan(0);
      expect(users[0].name).toBeTruthy();
      done();
    });
  });
});
