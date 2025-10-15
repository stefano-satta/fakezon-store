import {Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {Icon} from "../../components/common/icon/icon";
import {TranslatePipe} from "@ngx-translate/core";
import {ICON} from '../../../utils/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error-maintenance-page',
    imports: [
        Button,
        Icon,
        TranslatePipe
    ],
  templateUrl: './error-maintenance.html',
  styleUrl: './error-maintenance.scss'
})
export class ErrorMaintenance {
  protected readonly ICON = ICON;
  private readonly router = inject(Router);

  tryToHomepage() {
    this.router.navigate(['/']);
  }
}
