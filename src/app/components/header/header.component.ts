import { Component, OnInit, OnDestroy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Демонстрация signals
  private readonly title = signal('Angular Demo App');
  private readonly isMenuOpen = signal(false);
  
  // Computed signals
  readonly displayTitle = computed(() => 
    this.isMenuOpen() ? `${this.title()} - Menu Open` : this.title()
  );
  
  readonly cartItemCount = computed(() => 
    this.cartService.cartItems().length
  );

  constructor(
    public userService: UserService,
    public cartService: CartService
  ) {
    // Демонстрация effect
    effect(() => {
      console.log('Cart items changed:', this.cartItemCount());
    });
  }

  ngOnInit(): void {
    console.log('Header component initialized');
  }

  ngOnDestroy(): void {
    console.log('Header component destroyed');
  }

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }

  logout(): void {
    this.userService.logout();
  }
}
