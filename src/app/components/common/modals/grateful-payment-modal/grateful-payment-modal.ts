import {Component, inject, input, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Button} from 'primeng/button';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-grateful-payment-modal',
  imports: [Button, TranslatePipe],
  templateUrl: './grateful-payment-modal.html',
  styleUrl: './grateful-payment-modal.scss'
})
export class GratefulPaymentModal implements OnInit {
  title = input<string>('');
  message = input<string>('');
  cancelAction = input<boolean>(true);
  private readonly refModal = inject(DynamicDialogRef);
  private readonly configModal = inject(DynamicDialogConfig);

  ngOnInit() {
    console.log('data passed child ', this.configModal);
  }

  onConfirm(): void {
    this.refModal.close({confirmed: true});
  }

  onCancel(): void {
    this.refModal.close({confirmed: false});
  }

}
