import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {UserService} from '../../services/user-service';
import {TranslatePipe} from '@ngx-translate/core';
import {Icon} from '../../components/common/icon/icon';
import {ICON} from '../../../utils/icon';
import {finalize} from 'rxjs';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [
    TranslatePipe,
    Icon,
    TitleCasePipe
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile implements OnInit {
  protected userService = inject(UserService);
  protected readonly ICON = ICON;
  user = computed(() => this.userService.currentUser());
  loadingUser = signal<boolean>(false);

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.loadingUser.set(true);
    this.userService.getUser()
      .pipe(finalize(() => this.loadingUser.set(false)))
      .subscribe( user => {
        this.userService.currentUser.set(user);
    })
  }

  getFullName() : string {
    return `${this.user()?.name.firstname} ${this.user()?.name.lastname}`;
  }

}
