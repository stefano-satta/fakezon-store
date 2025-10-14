import {Component, computed, inject, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product-service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private translateService = inject(TranslateService);
  categories = computed(() => [...new Set(this.productService.allProducts().map(product => product.category.trim()))]
    .map((category, index) => ({id: index+1, category})));

  ngOnInit(): void {
  }

  translateCategories(category: string): string {
    return this.translateService.instant(`product.categories.${category}`);
  }

  filterProductsByCategory(category: string) {
    this.router.navigate(['/product/search'], {queryParams: {category}});
  }
}
