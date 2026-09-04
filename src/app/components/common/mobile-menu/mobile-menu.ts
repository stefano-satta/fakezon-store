import {Component, inject, model} from '@angular/core';
import {Drawer} from "primeng/drawer";
import {TranslatePipe} from '@ngx-translate/core';
import {Router, RouterLink} from '@angular/router';
import {ButtonChangeLanguages} from '../button-change-languages/button-change-languages';

@Component({
  selector: 'app-mobile-menu',
  imports: [
    Drawer,
    TranslatePipe,
    RouterLink,
    ButtonChangeLanguages
  ],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.scss'
})
export class MobileMenu {
  isOpenDrawer = model<boolean>(false);
  router = inject(Router);

  toggleDrawer() {
    this.isOpenDrawer.update( prevState => !prevState );
  }

  goToProfilePage() {
    this.router.navigate(['/user/profile']);
    this.toggleDrawer();
  }

  goToOrdersPage() {
    this.router.navigate(['/user/orders']);
    this.toggleDrawer();
  }

}
