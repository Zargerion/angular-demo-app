import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  template: `
    <div class="user-list-container">
      <h1>Список пользователей</h1>
      <div *ngIf="users.length > 0" class="users-grid">
        <mat-card *ngFor="let user of users" class="user-card">
          <mat-card-header>
            <div mat-card-avatar class="user-avatar">
              <img [src]="user.avatar" [alt]="user.name">
            </div>
            <mat-card-title>{{ user.name }}</mat-card-title>
            <mat-card-subtitle>{{ user.email }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <mat-chip [color]="user.role === 'admin' ? 'primary' : 'default'">
              {{ user.role | titlecase }}
            </mat-chip>
            <p>Дата регистрации: {{ user.createdAt | date:'dd.MM.yyyy' }}</p>
          </mat-card-content>
        </mat-card>
      </div>
      <div *ngIf="isLoading" class="loading">
        <mat-spinner></mat-spinner>
        <p>Загрузка пользователей...</p>
      </div>
    </div>
  `,
  styles: [`
    .user-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .user-avatar img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      gap: 16px;
    }
  `]
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  isLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.isLoading = false;
    });
  }
}
