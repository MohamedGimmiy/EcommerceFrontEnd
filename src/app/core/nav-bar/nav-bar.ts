import { Component, inject, OnInit } from '@angular/core';
import { Basket } from '../../basket/basket';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar implements OnInit {

  private basetService = inject(Basket);
  basketCount = 0;
  
  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId');
    this.basetService.GetBasket(basketId).subscribe({
      next: (basket) => {
        console.log(basket)
      },
      error: (error) => {
        console.log(error);
      }
    });
    
    this.basetService.basket.subscribe({
      next: (basket) => {
        if (basket) {
          this.basketCount = basket.basketItems.reduce((sum, item) => sum + item.quantity, 0);
        }
      }
    });
  }
  visible: boolean = false;
  ToggleDropdown(){
    this.visible = !this.visible;
  }
}
