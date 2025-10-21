import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule
  ],
  template: `
    <div class="profile-container">
      <h1>Профиль пользователя</h1>
      
      <div *ngIf="userService.currentUser() as user" class="profile-content">
        <mat-card class="profile-card">
          <mat-card-header>
            <div mat-card-avatar class="profile-avatar">
              <img [src]="user.avatar" [alt]="user.name">
            </div>
            <mat-card-title>{{ user.name }}</mat-card-title>
            <mat-card-subtitle>{{ user.email }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="profile-info">
              <div class="info-row">
                <mat-icon>person</mat-icon>
                <span>Имя: {{ user.name }}</span>
              </div>
              <div class="info-row">
                <mat-icon>email</mat-icon>
                <span>Email: {{ user.email }}</span>
              </div>
              <div class="info-row">
                <mat-icon>badge</mat-icon>
                <span>Роль: 
                  <mat-chip [color]="user.role === 'admin' ? 'primary' : 'default'">
                    {{ user.role | titlecase }}
                  </mat-chip>
                </span>
              </div>
              <div class="info-row">
                <mat-icon>calendar_today</mat-icon>
                <span>Дата регистрации: {{ user.createdAt | date:'dd.MM.yyyy' }}</span>
              </div>
            </div>
            
            <mat-divider></mat-divider>
            
            <div class="preferences">
              <h3>Предпочтения</h3>
              <div class="preference-item">
                <mat-icon>palette</mat-icon>
                <span>Тема: {{ user.preferences.theme | titlecase }}</span>
              </div>
              <div class="preference-item">
                <mat-icon>language</mat-icon>
                <span>Язык: {{ user.preferences.language | uppercase }}</span>
              </div>
              <div class="preference-item">
                <mat-icon>notifications</mat-icon>
                <span>Уведомления: {{ user.preferences.notifications ? 'Включены' : 'Отключены' }}</span>
              </div>
            </div>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-raised-button color="primary">
              <mat-icon>edit</mat-icon>
              Редактировать профиль
            </button>
            <button mat-stroked-button>
              <mat-icon>settings</mat-icon>
              Настройки
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .profile-avatar img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }
    .profile-info {
      margin: 20px 0;
    }
    .info-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .info-row mat-icon {
      color: #1976d2;
    }
    .preferences {
      margin-top: 20px;
    }
    .preferences h3 {
      margin-bottom: 16px;
    }
    .preference-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    .preference-item mat-icon {
      color: #666;
    }
  `]
})
export class ProfileComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    // Компонент инициализирован
  }
}
