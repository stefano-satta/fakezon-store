import {Component, computed, inject, OnInit} from '@angular/core';
import {environment} from '../../../../enviroments/enviroment';
import {RouterLink} from '@angular/router';
import {Icon} from '../icon/icon';
import {ICON} from '../../../../utils/icon';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ButtonChangeLanguages} from '../button-change-languages/button-change-languages';
import {Button} from 'primeng/button';
import {Badge} from 'primeng/badge';
import {CartService} from '../../../services/cart-service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    Icon,
    Menu,
    ButtonChangeLanguages,
    Button,
    Badge,
    TranslatePipe
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
  protected readonly logo = environment.app.title;
  protected itemsLink: MenuItem[] | undefined;
  protected readonly ICON = ICON;
  protected translateService = inject(TranslateService);
  protected cartService = inject(CartService);
  numProdInTheCart = computed(() => this.cartService.cart().length);

  ngOnInit() {
    this.translateService.get('navbar.user_menu').subscribe((user: UserMenuItem) => {
      console.log('log ',user)
      this.itemsLink = [
        { label: `${user.profile}`, icon: `pi ${ICON.userProfile}`, routerLink: '/user/profile'},
        { label: `${user.orders}`, icon: `pi ${ICON.orders}`, routerLink: '/user/profile'},
        { label: `${user.logout}`, icon: `pi ${ICON.logout}`, command: () => {}}
      ];
    });
  }
}
