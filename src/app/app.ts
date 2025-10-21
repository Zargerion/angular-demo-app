import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Angular Demo App');
  protected readonly isSidenavOpen = signal(false);

  ngOnInit(): void {
    console.log('App component initialized');
  }

  toggleSidenav(): void {
    this.isSidenavOpen.update(open => !open);
  }
}
