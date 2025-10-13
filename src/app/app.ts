import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ProductService} from './services/product-service';
import {finalize} from 'rxjs';
import {CartService} from './services/cart-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private productInTheCart: Product[] = [];

  ngOnInit() {
    this.getAllProductsForSlider();
    this.getCurrentCart();
  }

  getAllProductsForSlider() {
    this.productService.getAllProducts()
      .subscribe({
        next: products => {
          this.productService.allProducts.set(products);
        },
        error: () => this.router.navigate(['/error-maintenance'])
      })
  }

  getCurrentCart() {
    this.cartService.getCart()
      .pipe(finalize(() => {
        this.cartService.cart.set(this.productInTheCart);
        this.cartService.totalToPay();
      }))
      .subscribe({
        next: ({products}) => {
          products.map(productCart => {
            this.productInTheCart = [...this.productInTheCart,
              ...this.productService.allProducts().filter(product => product.id === productCart.productId).map(product => ({...product, ...{quantity: productCart.quantity}}))]
            console.log('filter', this.productInTheCart);
          })
        },
        error: () => this.router.navigate(['/error-maintenance'])
      })
    }
}
