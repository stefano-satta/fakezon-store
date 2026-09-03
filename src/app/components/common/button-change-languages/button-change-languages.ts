import {Component, inject, input, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FLAGS} from '../../../../utils/flags';

@Component({
  selector: 'app-button-change-languages',
  imports: [
    Button,
    TranslatePipe
  ],
  templateUrl: './button-change-languages.html',
  styleUrl: './button-change-languages.scss'
})
export class ButtonChangeLanguages implements OnInit {
  translateService = inject(TranslateService);
  labelText = input<boolean>(false);
  currentLanguage = '';

  ngOnInit() {
    this.currentLanguage = this.translateService.getCurrentLang();
    this.translateService.onLangChange.subscribe(currentLanguage => {
      this.currentLanguage = currentLanguage.lang;
      this.setFlag();
    })
  }

  setFlag(): string {
    switch (this.currentLanguage) {
      case 'it':
        return FLAGS.en;
      case 'en':
        return FLAGS.it
      default:
        return FLAGS.it;
    }
  }

  changeLanguage() {
    this.currentLanguage === 'it' ? this.translateService.use('en') : this.translateService.use('it');
  }

  setAltTextImg(): string {
    return this.currentLanguage === 'it' ? `lingua-bandiera-en` : `flag-language-it`;
  }

}
