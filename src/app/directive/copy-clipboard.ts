import {Directive, HostListener, inject, input, output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Directive({
  selector: '[copy-clipboard]'
})
export class CopyClipboard {
  text = input<string>('', {alias: 'copy-clipboard'});
  copiedClipboardAction = output<string>();
  translateService = inject(TranslateService);

  constructor() { }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.preventDefault();
    if (!this.text) { return; }

    let listener = (e: ClipboardEvent) => {
      let clipboard = e.clipboardData;
      clipboard?.setData("text", this.text().toString());
      e.preventDefault();
      let message = `${this.translateService.instant('homepage.discount.message_clipboard', {discount: this.text()})}`;
      this.copiedClipboardAction.emit(message);
    }

    document.addEventListener("copy", listener, false)
    document.execCommand("copy");
    document.removeEventListener("copy", listener, false);
  }

}
