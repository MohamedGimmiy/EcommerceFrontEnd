import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Basket } from '../../basket/basket';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar implements OnInit {

  private basketService = inject(Basket);
  private platformId = inject(PLATFORM_ID);
  basketCount$ = this.basketService.basketCount$;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const basketId = localStorage.getItem('basketId');
      this.basketService.GetBasket(basketId).subscribe({
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
  visible: boolean = false;
  ToggleDropdown(){
    this.visible = !this.visible;
  }
}
