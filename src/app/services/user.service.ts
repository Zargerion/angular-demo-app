import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _currentUser = signal<User | null>(null);
  private readonly _isLoading = signal(false);
  
  readonly currentUser = computed(() => this._currentUser());
  readonly isLoggedIn = computed(() => !!this._currentUser());
  readonly isLoading = computed(() => this._isLoading());
  
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  public readonly user$ = this.userSubject.asObservable();

  constructor() {
    this.initializeMockUser();
  }

  private initializeMockUser(): void {
    const mockUser: User = {
      id: 1,
      name: 'Иван Петров',
      email: 'ivan.petrov@example.com',
      avatar: 'https://via.placeholder.com/150',
      role: 'user',
      createdAt: new Date('2023-01-15'),
      preferences: {
        theme: 'light',
        language: 'ru',
        notifications: true
      }
    };
    
    this._currentUser.set(mockUser);
    this.userSubject.next(mockUser);
  }

  getUsers(): Observable<User[]> {
    this._isLoading.set(true);
    
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Иван Петров',
        email: 'ivan.petrov@example.com',
        avatar: 'https://via.placeholder.com/150',
        role: 'user',
        createdAt: new Date('2023-01-15'),
        preferences: { theme: 'light', language: 'ru', notifications: true }
      },
      {
        id: 2,
        name: 'Мария Сидорова',
        email: 'maria.sidorova@example.com',
        avatar: 'https://via.placeholder.com/150',
        role: 'admin',
        createdAt: new Date('2023-02-20'),
        preferences: { theme: 'dark', language: 'en', notifications: false }
      }
    ];
    
    return of(mockUsers).pipe(
      delay(800),
      tap(() => this._isLoading.set(false))
    );
  }

  logout(): void {
    this._currentUser.set(null);
    this.userSubject.next(null);
  }
}