import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {ProductService} from '../../services/product-service';
import {Button} from 'primeng/button';
import {CurrencyPipe} from '@angular/common';
import {Icon} from '../../components/common/icon/icon';
import {ICON} from '../../../utils/icon';
import {CartService} from '../../services/cart-service';
import {ActivatedRoute} from '@angular/router';
import {Categories} from '../../components/common/categories/categories';

@Component({
  selector: 'app-all-products-search',
  imports: [
    TranslatePipe,
    Button,
    CurrencyPipe,
    Icon,
    Categories,
  ],
  templateUrl: './all-products-search.html',
  styleUrl: './all-products-search.scss'
})
export class AllProductsSearch implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly route = inject(ActivatedRoute);
  protected readonly ICON = ICON;
  protected getAllProds = computed(() => this.productService.allProducts());
  protected filteredProducts = signal<Product[]>([]);
  protected rows: number = 10;


  ngOnInit() {
    this.route.queryParams.subscribe(qparams => {
      console.log('query', qparams);
      if (Object.keys(qparams).length === 0) {
        this.filteredProducts.set(this.getAllProds());
        console.log(' inside ', this.filteredProducts())
      } else {
        const { category } = qparams;
        this.filterProductByCategory(category);
      }
    })
  }

  addProductToCart(product: Product) {
    this.cartService.addProduct({...product, quantity: Number(product.quantity! + 1)});
  }

  filterProductByCategory(category: string) {
    this.filteredProducts.set(
      this.getAllProds()
        .filter(product => product.category.trim().toLowerCase() === category.trim().toLowerCase())
    )
  }

  resetCategory() {
    this.filteredProducts.set(this.getAllProds());
  }
}
