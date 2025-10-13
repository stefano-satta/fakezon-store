import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ProductService} from './services/product-service';
import {finalize} from 'rxjs';
import {CartService} from './services/cart-service';
import {Icon} from './components/common/icon/icon';
import {ICON} from '../utils/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Icon],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private productInTheCart: Product[] = [];
  protected loadingProducts = signal<boolean>(false);
  protected loadingCart = signal<boolean>(false);

  ngOnInit() {
    this.getAllProductsForSlider();
    this.getCurrentCart();
  }

  getAllProductsForSlider() {
    this.loadingProducts.set(true);
    this.productService.getAllProducts()
      .pipe(finalize(() => this.loadingProducts.set(false)))
      .subscribe({
        next: products => {
          this.productService.allProducts.set(products.map(prod => ({...prod, quantity: 0})));
        },
        error: () => this.router.navigate(['/error-maintenance'])
      })
  }

  getCurrentCart() {
    this.loadingCart.set(true);
    this.cartService.getCart()
      .pipe(finalize(() => {
        this.cartService.cart.set(this.productInTheCart);
        this.cartService.totalToPay();
        this.loadingCart.set(false);
      }))
      .subscribe({
        next: ({products}) => {
          products.map(productCart => {
            this.productInTheCart = [...this.productInTheCart,
              ...this.productService.allProducts()
                .filter(product => product.id === productCart.productId)
                .map(product => ({...product, ...{quantity: productCart.quantity}}))]
          })
        },
        error: () => this.router.navigate(['/error-maintenance'])
      })
    }

  protected readonly ICON = ICON;
}
