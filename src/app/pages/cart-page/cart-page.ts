import {Component, computed, inject, OnDestroy, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CartService} from '../../services/cart-service';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {InputNumber, InputNumberInputEvent} from 'primeng/inputnumber';
import {Icon} from '../../components/common/icon/icon';
import {ICON} from '../../../utils/icon';
import {Button} from 'primeng/button';
import {PaymentMethod} from '../../components/common/payment-method/payment-method';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {GratefulPaymentModal} from '../../components/common/modals/grateful-payment-modal/grateful-payment-modal';

@Component({
  selector: 'app-cart-page',
  imports: [
    TranslatePipe,
    FormsModule,
    CurrencyPipe,
    InputNumber,
    Icon,
    Button,
    PaymentMethod,
  ],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPage implements OnInit, OnDestroy {
  private readonly cartService = inject(CartService);
  private readonly dialogService = inject(DialogService);
  private readonly translateService = inject(TranslateService);
  protected currentCart = computed(() => this.cartService.cart());
  protected getTotal = computed(() => this.cartService.totalToPayCart());
  protected readonly ICON = ICON;
  private refDialog: DynamicDialogRef | undefined;

  ngOnInit(): void {
  }

  remove(idProduct: number) {
    this.cartService.removeProduct(idProduct);
  }

  onChangeProdQuantity(idProduct: number, qty: InputNumberInputEvent) {
    this.cartService.changeQuantityProductById(idProduct, Number(qty.value));
  }

  showModalPayment() {
    this.refDialog = this.dialogService.open(GratefulPaymentModal, {
      header: this.translateService.instant('modal.grateful_payment.title'),
      modal: true,
      closable: true,
      width: '40vw',
      breakpoints: {
        '960px': '50vw',
        '640px': '90vw'
      },
      baseZIndex: 10000,
      inputValues: {
        message: this.translateService.instant('modal.grateful_payment.message'),
        cancelAction: false
      },
    });

    this.refDialog?.onClose.subscribe((result) => {
      if(result.confirmed) {
        window.open('https://stefanosatta.vercel.app/', '_blank');
      }
    });
  }

  ngOnDestroy() {
    if (this.refDialog) {
      this.refDialog.close();
    }
  }
}
