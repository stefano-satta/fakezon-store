import {AfterViewInit, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {environment} from '../../../../enviroments/enviroment';
import {RouterLink} from '@angular/router';
import {Icon} from '../icon/icon';
import {ICON} from '../../../../utils/icon';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ButtonChangeLanguages} from '../button-change-languages/button-change-languages';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    Icon,
    Menu,
    ButtonChangeLanguages,
    Button
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
  protected readonly logo = environment.app.title;
  protected itemsLink: MenuItem[] | undefined;
  protected readonly Icon = Icon;
  protected readonly ICON = ICON;
  protected translateService = inject(TranslateService);

  ngOnInit() {
    this.translateService.get('navbar.user').subscribe((user: UserMenuItem) => {
      this.itemsLink = [
        { label: `${user.profile}`, icon: `pi ${ICON.userProfile}`, routerLink: '/user/profile'},
        { label: `${user.orders}`, icon: `pi ${ICON.orders}`, routerLink: '/user/profile'},
        { label: `${user.logout}`, icon: `pi ${ICON.logout}`, command: () => {}}
      ];
    });
  }
}
