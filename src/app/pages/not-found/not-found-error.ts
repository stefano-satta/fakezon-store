import {Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {TranslatePipe} from "@ngx-translate/core";
import {ICON} from '../../../utils/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-not-found',
    imports: [
        Button,
        TranslatePipe
    ],
  templateUrl: './not-found-error.html',
  styleUrl: './not-found-error.scss'
})
export class NotFoundError {
  protected readonly ICON = ICON;
  private readonly router = inject(Router);

  tryToHomepage() {
    this.router.navigate(['/']);
  }
}
